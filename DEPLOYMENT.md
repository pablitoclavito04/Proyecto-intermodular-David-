# Deployment Guide

## Production Deployment

### Prerequisites
- Docker & Docker Compose installed
- Domain name
- SSL Certificate
- OpenAI API Key
- PayPal Business Account

## Option 1: Docker Compose (Recommended for Small Deployments)

### 1. Prepare Server
```bash
# SSH into your server
ssh user@your-server.com

# Install Docker and Docker Compose
curl -sSL https://get.docker.com | sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone <repo-url>
cd ai-interview-platform
```

### 2. Configure Environment Variables
```bash
# Create production .env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit with production values
nano backend/.env
nano frontend/.env
```

**backend/.env** (Production):
```
PORT=5000
MONGODB_URI=mongodb://admin:secure_password@mongo:27017/ai-interview
JWT_SECRET=your_very_secure_random_jwt_secret_min_32_chars
NODE_ENV=production
OPENAI_API_KEY=sk-...
PAYPAL_MODE=live
PAYPAL_CLIENT_ID=your_live_paypal_id
PAYPAL_SECRET=your_live_paypal_secret
FRONTEND_URL=https://your-domain.com
```

**frontend/.env** (Production):
```
REACT_APP_API_URL=https://your-domain.com/api
REACT_APP_PAYPAL_CLIENT_ID=your_live_paypal_id
```

### 3. Setup SSL/TLS with Let's Encrypt
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com
```

### 4. Create Production Docker Compose File
Create `docker-compose.prod.yml`:
```yaml
version: '3.8'

services:
  mongo:
    image: mongo:7.0
    restart: always
    volumes:
      - mongo_prod:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    networks:
      - ai_network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    environment:
      PORT: 5000
      MONGODB_URI: mongodb://admin:${MONGO_PASSWORD}@mongo:27017/ai-interview
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      PAYPAL_MODE: live
      PAYPAL_CLIENT_ID: ${PAYPAL_CLIENT_ID}
      PAYPAL_SECRET: ${PAYPAL_SECRET}
      FRONTEND_URL: https://your-domain.com
    depends_on:
      - mongo
    networks:
      - ai_network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: always
    environment:
      REACT_APP_API_URL: https://your-domain.com/api
      REACT_APP_PAYPAL_CLIENT_ID: ${PAYPAL_CLIENT_ID}
    depends_on:
      - backend
    networks:
      - ai_network

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt/live/your-domain.com:/etc/nginx/certs:ro
    depends_on:
      - frontend
      - backend
    networks:
      - ai_network

volumes:
  mongo_prod:

networks:
  ai_network:
```

### 5. Create Nginx Configuration
Create `nginx.conf`:
```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml font/truetype font/opentype 
               application/vnd.ms-fontobject image/svg+xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=app_limit:10m rate=30r/s;

    # Upstream servers
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:5000;
    }

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name your-domain.com www.your-domain.com;
        return 301 https://$server_name$request_uri;
    }

    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name your-domain.com www.your-domain.com;

        ssl_certificate /etc/nginx/certs/fullchain.pem;
        ssl_certificate_key /etc/nginx/certs/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        client_max_body_size 50M;

        # Security headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # API routes
        location /api/ {
            limit_req zone=api_limit burst=20 nodelay;
            
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Frontend
        location / {
            limit_req zone=app_limit burst=50 nodelay;
            
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;

            # Cache static assets
            location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
                expires 30d;
                add_header Cache-Control "public, immutable";
            }
        }

        # Health checks
        location /health {
            access_log off;
            proxy_pass http://backend;
        }
    }
}
```

### 6. Deploy
```bash
# Build and start services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 7. Backup and Maintenance
```bash
# Backup database
docker exec ai_interview_mongo mongodump --archive > backup.archive

# Restore database
docker exec -i ai_interview_mongo mongorestore --archive < backup.archive

# Update SSL certificate
sudo certbot renew

# Update application
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

## Option 2: Cloud Deployment (AWS, Google Cloud, Azure)

### AWS Elastic Container Service (ECS)

1. **Create ECR repositories**
2. **Push Docker images**
3. **Create ECS Task Definitions**
4. **Create ALB with SSL**
5. **Create RDS MongoDB instance**
6. **Deploy services**

### Google Cloud Run

1. **Push to Google Container Registry**
2. **Deploy frontend and backend**
3. **Configure Cloud Load Balancing**
4. **Use Cloud Firestore or MongoDB Atlas**

## Monitoring & Logging

### Setup Monitoring
```bash
# Install monitoring tools
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  prom/prometheus

# Install logging
docker run -d \
  --name loki \
  -p 3100:3100 \
  grafana/loki
```

## Performance Optimization

1. **Enable caching**: Configure Redis
2. **CDN**: Use CloudFlare or AWS CloudFront
3. **Database indexing**: Create indexes on frequently queried fields
4. **Load balancing**: Use multiple backend instances
5. **Auto-scaling**: Configure based on CPU/memory

## Security Checklist

- [ ] Change default passwords
- [ ] Enable HTTPS/SSL
- [ ] Setup firewall rules
- [ ] Enable API rate limiting
- [ ] Setup backup strategy
- [ ] Monitor logs for attacks
- [ ] Regular security updates
- [ ] Setup intrusion detection
- [ ] Enable audit logging
- [ ] Implement DDoS protection

## Troubleshooting

### Containers won't start
```bash
docker-compose -f docker-compose.prod.yml logs
```

### MongoDB connection issues
```bash
docker exec ai_interview_mongo mongo -u admin -p password
```

### Memory leaks
```bash
# Monitor memory usage
docker stats
```

## Support

For deployment issues, refer to Docker and cloud provider documentation.

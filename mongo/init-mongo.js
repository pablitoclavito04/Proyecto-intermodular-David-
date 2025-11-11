// Script de inicialización para MongoDB
// Este script se ejecuta automáticamente cuando se crea el contenedor por primera vez

db = db.getSiblingDB("interviews_db");

// Crear colecciones
db.createCollection("users");
db.createCollection("interviews");
db.createCollection("evaluations");
db.createCollection("payments");

// Crear índices para optimizar consultas
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: 1 });

db.interviews.createIndex({ userId: 1 });
db.interviews.createIndex({ date: -1 });
db.interviews.createIndex({ status: 1 });

db.evaluations.createIndex({ interviewId: 1 }, { unique: true });
db.evaluations.createIndex({ score: 1 });

db.payments.createIndex({ userId: 1 });
db.payments.createIndex({ interviewId: 1 });

// Insertar datos de ejemplo (opcional - puedes comentar/eliminar esto en producción)
db.users.insertOne({
  email: "demo@example.com",
  name: "Usuario Demo",
  createdAt: new Date(),
  subscription: "free",
});

print("✅ Base de datos inicializada correctamente");
print("📊 Colecciones creadas: users, interviews, evaluations, payments");

import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // límite de peticiones
  message: {
    success: false,
    message:
      "Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Rate limiter más estricto para autenticación
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: {
    success: false,
    message:
      "Demasiados intentos de inicio de sesión, por favor intenta de nuevo en 15 minutos.",
  },
  skipSuccessfulRequests: true,
});

// ====================================================================
// DAMRUBET RATE LIMITER MIDDLEWARE
// Kaam: Yeh file humare server par bot spam ya heavy traffic attacks (DDoS) ko rokti hai.
// ====================================================================

const rateLimit = require('express-rate-limit');

/**
 * 1. GENERAL RATE LIMITER (Humare poore backend par lagane ke liye)
 * Ek IP address se 15 minutes me maximum 100 requests allowed hain.
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes (miliseconds me)
  max: 100, // Maximum requests limit per IP
  standardHeaders: true, // Standard rate limit headers return karega response me
  legacyHeaders: false, // Purane 'X-RateLimit-*' headers ko band karta hai
  message: {
    status: 429,
    error: 'Too many requests',
    message: 'Aapne bohot saari requests bhej di hain. Kripya 15 minutes baad dobara koshish karein (General Limit).'
  }
});

/**
 * 2. STRICT BET LIMITER (Sirf critical ya bet lagane wale routes ke liye)
 * Ek IP address se 10 seconds me maximum 10 requests allowed hain.
 * Isse automatic bots ya scripts bohot tezi se betting nahi kar payenge.
 */
const betLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 Seconds (miliseconds me)
  max: 10, // Maximum requests limit per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many requests on Bet activity',
    message: 'Bet activity par limit lagayi gayi hai. Kripya 10 seconds me max 10 baar hi call karein.'
  }
});

// Dono limiters ko module ke bahar export karte hain taaki server.js inhe use kar sake
module.exports = {
  generalLimiter,
  betLimiter
};

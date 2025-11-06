// src/api.js

// Base URL: empty for dev (use Vite proxy), production URL from env
export const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL // production
  : ""; // development (proxy)

  // Temporary debug
console.log('PROD:', import.meta.env.PROD);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Full import.meta.env:', import.meta.env);
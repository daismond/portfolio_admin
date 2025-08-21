// This file exports the configuration for the frontend application.

// VITE_API_BASE_URL is defined in the .env file for different environments (e.g., .env.production).
// If it's not set (e.g., in local development), it defaults to the local backend server.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export { API_BASE_URL };

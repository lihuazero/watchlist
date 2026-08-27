import * as Joi from 'joi';

/**
 * Joi validation schema for environment variables consumed by the backend.
 *
 * - PORT: the port the HTTP server listens on. Defaults to 3100 so it does
 *   not clash with the frontend Next.js dev server.
 * - FRONTEND_ORIGIN: informational/log-only value describing which origin
 *   the frontend is expected to run at during local development. This is
 *   NOT used to restrict CORS (CORS is configured to allow all origins).
 */
export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3100),
  FRONTEND_ORIGIN: Joi.string().default('http://localhost:3000'),
});

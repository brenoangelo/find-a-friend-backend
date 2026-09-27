import { authenticate } from "@/http/controllers/orgs/authenticate";
import { refresh } from "@/http/controllers/orgs/refresh";
import { register } from "@/http/controllers/orgs/register";
import { FastifyInstance } from "fastify";

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  app.post('/token/refresh', refresh)
}

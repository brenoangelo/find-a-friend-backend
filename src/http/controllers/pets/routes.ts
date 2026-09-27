
import { fetch } from "@/http/controllers/pets/fetch";
import { fetchById } from "@/http/controllers/pets/fetch-by-id";
import { register } from "@/http/controllers/pets/register";
import { update } from "@/http/controllers/pets/update";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function petRoutes(app: FastifyInstance) {
  app.get('/pets', fetch)
  app.get('/pets/:id', fetchById)
  app.post('/pets', {
    onRequest: [verifyJWT]
  },register)
  app.put('/pets/:id', {
    onRequest: [verifyJWT]
  }, update)
}

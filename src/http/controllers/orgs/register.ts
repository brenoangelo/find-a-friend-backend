import { makeRegisterOrgUseCase } from "@/use-cases/factories/make-register-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    phone: z.string(),
    state: z.string(),
    number: z.number(),
    city: z.string(),
    address: z.string()
  })

  const { address,
    city,
    email,
    name,
    password,
    phone,
    state,
    number } = registerBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      address,
    city,
    email,
    name,
    password,
    phone,
    state,
    number
    })
  } catch (err) {
    throw err
  }

  return reply.status(201).send()
}

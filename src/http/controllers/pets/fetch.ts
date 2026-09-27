import { makeFetchPetsUseCase } from "@/use-cases/factories/make-fetch-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsBodySchema = z.object({
    city: z.string(),
    ageGroup: z.enum(['YOUNG', 'ADULT', 'ADULT']).optional(),
    energyLevel: z.coerce.number().optional(),
    size: z.enum(['LARGE', 'MEDIUM', 'SMALL']).optional()
  })

  const { ageGroup, city, energyLevel, size } = fetchPetsBodySchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    age_group: ageGroup, city, energy_level: energyLevel, size
  })

  return reply.status(200).send({
    pets
  })
}

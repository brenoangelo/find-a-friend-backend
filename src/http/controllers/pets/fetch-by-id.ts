import { makeFindPetByIdUseCase } from "@/use-cases/factories/make-find-pet-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function fetchById(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetByIdSchema = z.object({
    id: z.uuid()
  })

  const { id } = fetchPetByIdSchema.parse(request.params)

  const findPetByIdUseCase = makeFindPetByIdUseCase()

  const { pet, orgInfo } = await findPetByIdUseCase.execute({
    id
  })

  return reply.status(200).send({
    pet,
    orgInfo
  })
}

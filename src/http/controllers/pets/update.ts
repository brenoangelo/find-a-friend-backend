import { makeUpdatePetUseCase } from "@/use-cases/factories/make-update-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updatePetsBodySchema = z.object({
    name: z.string(),
    category: z.enum(["CAT", "DOG", "BIRD", "EXOTIC"]),
    ageGroup: z.enum(["YOUNG", "ADULT", "SENIOR"]),
    requirements: z.array(z.string()),
    about: z.string().optional(),
    energyLevel: z.number().min(1).max(5),
    size: z.enum(["LARGE", "MEDIUM", "SMALL"]),
    independence: z.enum(["LOW", "MEDIUM", "HIGHT"]),
    photos: z.array(z.string()),
  });

  const updatePetsParamsSchema = z.object({
    id: z.uuid()
  })

  const {
    about,
    ageGroup,
    category,
    requirements,
    energyLevel,
    independence,
    name,
    photos,
    size,
  } = updatePetsBodySchema.parse(request.body);

  const { id } = updatePetsParamsSchema.parse(request.params)

  const updatePetUseCase = makeUpdatePetUseCase()

  await updatePetUseCase.execute({
    about,
    age_group: ageGroup,
    energy_level: energyLevel,
    independence,
    name,
    photos,
    size,
    category,
    requirements,
    id
  })
}

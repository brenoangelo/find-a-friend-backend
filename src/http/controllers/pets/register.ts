import { makeRegisterPetUseCase } from "@/use-cases/factories/make-register-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsBodySchema = z.object({
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
  } = fetchPetsBodySchema.parse(request.body);

  const registerPetUseCase = makeRegisterPetUseCase();

  await registerPetUseCase.execute({
    about,
    age_group: ageGroup,
    energy_level: energyLevel,
    independence,
    name,
    photos,
    size,
    category,
    requirements,
    org_id: request.user.sub,
  });

  reply.status(201).send();
}

import { PrismaOrgsRepository } from "@/repositories/prisma/orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/pets-repository";
import { FindPetByIdUseCase } from "@/use-cases/find-pet-by-id";

export function makeFindPetByIdUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new FindPetByIdUseCase(prismaPetsRepository, prismaOrgsRepository)

  return useCase
}

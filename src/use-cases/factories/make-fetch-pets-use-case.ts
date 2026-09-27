import { PrismaOrgsRepository } from "@/repositories/prisma/orgs-repository"
import { PrismaPetsRepository } from "@/repositories/prisma/pets-repository"
import { FetchPetsUseCase } from "@/use-cases/fetch-pets"

export function makeFetchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new FetchPetsUseCase(prismaPetsRepository, prismaOrgsRepository)

  return useCase
}

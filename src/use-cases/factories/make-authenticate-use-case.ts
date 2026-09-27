import { PrismaOrgsRepository } from "@/repositories/prisma/orgs-repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate"


export function makeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(prismaOrgsRepository)

  return useCase
}

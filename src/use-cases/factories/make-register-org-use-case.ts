import { PrismaOrgsRepository } from "@/repositories/prisma/orgs-repository";
import { RegisterOrgUseCase } from "@/use-cases/register-org";

export function makeRegisterOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new RegisterOrgUseCase(prismaOrgsRepository)

  return useCase
}

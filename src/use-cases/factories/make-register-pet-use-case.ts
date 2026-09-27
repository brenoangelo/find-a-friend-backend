import { PrismaPetsRepository } from "@/repositories/prisma/pets-repository"
import { RegisterPetUseCase } from "@/use-cases/register-pet"

export function makeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new RegisterPetUseCase(prismaPetsRepository)

  return useCase
}

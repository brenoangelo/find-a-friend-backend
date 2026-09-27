import { PrismaPetsRepository } from '@/repositories/prisma/pets-repository';
import { UpdatePetUseCase } from '@/use-cases/update-pet';

export function makeUpdatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new UpdatePetUseCase(prismaPetsRepository)

  return useCase
}

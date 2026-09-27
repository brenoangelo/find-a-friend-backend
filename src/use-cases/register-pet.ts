import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string
  about?: string
  age_group: 'YOUNG' | 'ADULT' | 'SENIOR'
  energy_level: number
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  independence: 'LOW' | 'MEDIUM' | 'HIGHT'
  photos: string[]
  org_id: string
  requirements: string[]
  category: 'DOG' | 'CAT' | 'BIRD' | 'EXOTIC'
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age_group,
    energy_level,
    independence,
    name,
    org_id,
    photos,
    size,
    about,
    category,
    requirements
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse>{
    const pet = await this.petsRepository.create({
      age_group,
      energy_level,
      independence,
      name,
      org_id,
      photos,
      size,
      about,
      category,
      requirements
    })

    return {
      pet
    }
  }
}

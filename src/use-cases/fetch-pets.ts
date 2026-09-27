import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FetchPetsUseCaseRequest {
  city: string
  age_group?: 'YOUNG' | 'ADULT' | 'SENIOR'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level?: number
  category?: ['DOG' | 'CAT' | 'BIRD' | 'EXOTIC']
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository, private orgsRepository: OrgsRepository) {}

  async execute({
    city,
    age_group,
    energy_level,
    size,
    category
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse>{
    const orgs = await this.orgsRepository.findOrgsByCity(city)

    const pets = await this.petsRepository.findManyByFilter({
      orgs: orgs.map(org => org.id),
      age_group,
      energy_level,
      size,
      category
    })

    return {
      pets
    }
  }
}

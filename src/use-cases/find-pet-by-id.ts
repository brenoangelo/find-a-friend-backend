

import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found";
import { Pet } from "@prisma/client";

interface OrgInfo {
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  number: number
}

interface FindPetByIdUseCaseRequest {
  id: string
}

interface FindPetByIdUseCaseResponse {
  pet: Pet | null,
  orgInfo: OrgInfo
}

export class FindPetByIdUseCase {
  constructor(private petsRepository: PetsRepository, private orgsRepository: OrgsRepository) {}

  async execute({
    id
  }: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse>{
    const pet = await this.petsRepository.findById(id)

    if(!pet) {
      throw new PetNotFoundError()
    }

    const org = await this.orgsRepository.findById(pet?.org_id)

    if(!org) {
      throw new PetNotFoundError()
    }

    return {
      pet,
      orgInfo: {
        address: org?.address,
        city: org.city,
        name: org.name,
        phone: org.phone,
        state: org.state,
        number: org.number
      }
    }
  }
}

import { PetsRepository } from "@/repositories/pets-repository";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found";
import { Pet } from "@prisma/client";

interface UpdatePetUseCaseRequest {
  name: string;
  about?: string;
  age_group: "YOUNG" | "ADULT" | "SENIOR";
  energy_level: number;
  size: "SMALL" | "MEDIUM" | "LARGE";
  independence: "LOW" | "MEDIUM" | "HIGHT";
  photos: string[];
  requirements: string[];
  category: "DOG" | "CAT" | "BIRD" | "EXOTIC";
  id: string;
}

interface UpdatePetUseCaseResponse {
  pet: Pet;
}

export class UpdatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age_group,
    category,
    energy_level,
    independence,
    name,
    photos,
    requirements,
    size,
    about,
    id,
  }: UpdatePetUseCaseRequest): Promise<UpdatePetUseCaseResponse> {
    const petExists = await this.petsRepository.findById(id)

    if(!petExists) {
      throw new PetNotFoundError()
    }

    const pet = await this.petsRepository.update(id, {
      age_group,
      category,
      energy_level,
      independence,
      name,
      photos,
      requirements,
      size,
      about,
    });

    return { pet }
  }
}

import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach } from "vitest";
import { describe, expect, it } from "vitest";

import { randomUUID } from 'node:crypto'
import { UpdatePetUseCase } from "@/use-cases/update-pet";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found";

let petsRepository: InMemoryPetsRepository
let sut: UpdatePetUseCase

describe('Update Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new UpdatePetUseCase(petsRepository)

    petsRepository.create({
      id: '123',
      name: 'Nico',
      age_group: 'YOUNG',
      about: 'Exemplo de texto',
      energy_level: 5,
      size: 'MEDIUM',
      independence: 'MEDIUM',
      org_id: randomUUID(),
      photos: [],
      category: 'DOG',
      requirements: []
    })
  })

  it('should be able to update a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Bilbo',
      age_group: 'ADULT',
      about: 'Cachorro danado',
      energy_level: 3,
      size: 'SMALL',
      independence: 'HIGHT',
      photos: [],
      category: 'CAT',
      requirements: [],
      id: '123'
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet).toEqual(expect.objectContaining({
      name: 'Bilbo',
      age_group: 'ADULT',
      about: 'Cachorro danado',
      energy_level: 3,
      size: 'SMALL',
      independence: 'HIGHT',
      photos: [],
      category: 'CAT',
      requirements: [],
    }))
  })

  it('should be able dont update pet is not exists', async () => {
    await expect(() => sut.execute({
      name: 'Bilbo',
      age_group: 'ADULT',
      about: 'Cachorro danado',
      energy_level: 3,
      size: 'SMALL',
      independence: 'HIGHT',
      photos: [],
      category: 'CAT',
      requirements: [],
      id: '1234'
    })).rejects.toBeInstanceOf(PetNotFoundError)
  })
})

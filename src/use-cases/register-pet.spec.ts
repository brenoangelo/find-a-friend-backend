import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { RegisterPetUseCase } from "@/use-cases/register-pet";
import { beforeEach } from "vitest";
import { describe, expect, it } from "vitest";

import { randomUUID } from 'node:crypto'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be get all pets by city', async () => {
    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })
})

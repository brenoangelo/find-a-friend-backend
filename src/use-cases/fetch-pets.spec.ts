import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { FetchPetsUseCase } from "@/use-cases/fetch-pets"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch pets Use Case', async () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository
    petsRepository = new InMemoryPetsRepository
    sut = new FetchPetsUseCase(petsRepository, orgsRepository)

    await orgsRepository.create({
      id: 'org-01',
      name: 'Breno Pets',
      address: 'Rua Pedro Alves de Morais',
      city: 'Timon',
      email: "brenoangeloal@gmail.com",
      number: 760,
      password_hash: await hash('123456', 6),
      phone: '(86) 99982-0862',
      state: 'MA'
    })
  })

  it('should get pets by city', async () => {
    petsRepository.items.push({
      name: 'Frida',
      age_group: 'SENIOR',
      about: 'Exemplo de texto',
      category: 'DOG',
      energy_level: 5,
      size: 'MEDIUM',
      independence: 'MEDIUM',
      org_id: 'org-02',
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '123',
      requirements: []
    })

    petsRepository.items.push({
      name: 'Nico',
      age_group: 'YOUNG',
      about: 'Exemplo de texto',
      category: 'DOG',
      energy_level: 5,
      size: 'MEDIUM',
      independence: 'MEDIUM',
      org_id: 'org-01',
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '123',
      requirements: []
    })

    const { pets } = await sut.execute({
      city: 'Timon'
    })

    expect(pets.length).toBe(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Nico',
        age_group: 'YOUNG',
        about: 'Exemplo de texto',
        energy_level: 5,
        size: 'MEDIUM',
        independence: 'MEDIUM',
        org_id: 'org-01',
        photos: []
      })
    ])
  })

  it('should get pets by params', async () => {
    petsRepository.items.push({
      name: 'Frida',
      age_group: 'SENIOR',
      about: 'Exemplo de texto',
      category: 'DOG',
      energy_level: 3,
      size: 'LARGE',
      independence: 'LOW',
      org_id: 'org-01',
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '123',
      requirements: []
    })

    petsRepository.items.push({
      name: 'Nico',
      age_group: 'YOUNG',
      about: 'Exemplo de texto',
      category: 'DOG',
      energy_level: 5,
      size: 'MEDIUM',
      independence: 'MEDIUM',
      org_id: 'org-01',
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '123',
      requirements: ['Não pode ficar sozinho']
    })

    const { pets } = await sut.execute({
      city: 'Timon',
      age_group: 'YOUNG',
      energy_level: 5,
      size: 'MEDIUM'
    })

    expect(pets.length).toBe(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Nico',
        age_group: 'YOUNG',
        about: 'Exemplo de texto',
        energy_level: 5,
        size: 'MEDIUM',
        independence: 'MEDIUM',
        org_id: 'org-01',
        photos: [],
        requirements: ['Não pode ficar sozinho']
      })
    ])
  })

  it('should not found pet by city', async () => {
    petsRepository.items.push({
      name: 'Frida',
      age_group: 'SENIOR',
      about: 'Exemplo de texto',
      category: 'DOG',
      energy_level: 3,
      size: 'LARGE',
      independence: 'LOW',
      org_id: 'org-01',
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '123',
      requirements: []
    })

    const { pets } = await sut.execute({
      city: 'Teresina'
    })

    expect(pets.length).toBe(0)
  })

  it('should not found pet by params', async () => {
    petsRepository.items.push({
      name: 'Frida',
      age_group: 'SENIOR',
      about: 'Exemplo de texto',
      category: 'DOG',
      energy_level: 3,
      size: 'LARGE',
      independence: 'LOW',
      org_id: 'org-01',
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: '123',
      requirements: []
    })

    const { pets } = await sut.execute({
      city: 'Timon',
      energy_level: 2,
      age_group: 'SENIOR',
      size: 'MEDIUM'
    })

    expect(pets.length).toBe(0)
  })
})

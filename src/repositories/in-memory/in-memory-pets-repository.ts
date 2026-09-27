import { FindManyByFilterParams, PetsRepository } from "@/repositories/pets-repository";
import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";


export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age_group: data.age_group,
      energy_level: data.energy_level,
      size: data.size,
      independence: data.independence,
      photos: (data.photos ?? []) as string[],
      createdAt: new Date(),
      org_id: data.org_id ?? '',
      updatedAt: new Date(),
      requirements: (data.requirements ?? []) as string[],
      category: data.category
    }

    this.items.push(pet)

    return pet
  }

  async update(id: string, data: Prisma.PetUncheckedUpdateInput) {
    const petIdx = this.items.findIndex(item => item.id === id)
    const currentPet = this.items[petIdx]
    const pet = {
      ...currentPet,
      name: data.name ?? currentPet.name,
      about: data.about ?? currentPet.about,
      age_group: data.age_group ?? currentPet.age_group,
      category: data.category ?? currentPet.category,
      energy_level: data.energy_level ?? currentPet.energy_level,
      independence: data.independence ?? currentPet.independence,
      photos: (data.photos ?? currentPet.photos) as string[],
      requirements: (data.requirements ?? currentPet.requirements) as string[],
      size: data.size ?? currentPet.size,
      updatedAt: new Date()
    } as unknown as Pet

    this.items[petIdx] = pet

    return pet
  }

  async findManyByFilter(params: FindManyByFilterParams){
    const pets = this.items.filter(item => {
      return params.orgs.includes(item.org_id)
    }).filter(item => {
      return Object.entries(params).every(([key, value]) => {
        if(key === 'orgs') return value.includes(item.org_id)

        if(key === 'category') return value ? value?.includes(item.category) : true

        if(value == null) return true

        return item[key as keyof typeof item] === value
      })
    })

    return pets
  }

  async findById(id: string){
    const pet = this.items.find(item => item.id === id)

    if(!pet) return null

    return pet
  }
}

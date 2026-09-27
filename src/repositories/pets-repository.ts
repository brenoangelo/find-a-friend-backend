import { Pet, Prisma } from "@prisma/client";

export interface FindManyByFilterParams {
  orgs: string[]
  age_group?: 'YOUNG' | 'ADULT' | 'SENIOR'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level?: number
  category?: ['DOG' | 'CAT' | 'BIRD' | 'EXOTIC']
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  update(id: string, data: Prisma.PetUncheckedUpdateInput): Promise<Pet>
  findManyByFilter(params: FindManyByFilterParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}

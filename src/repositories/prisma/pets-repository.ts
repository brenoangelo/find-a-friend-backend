import { prisma } from "@/lib/prisma";
import { FindManyByFilterParams, PetsRepository } from "@/repositories/pets-repository";
import { Pet, Prisma } from "@prisma/client";


export class PrismaPetsRepository implements PetsRepository {

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }

  async update(id: string, data: Prisma.PetUncheckedUpdateInput) {
    const pet = await prisma.pet.update({
      where: {
        id
      },
      data
    })

    return pet
  }

  async findManyByFilter({ orgs, age_group, energy_level, size, category }: FindManyByFilterParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age_group,
        energy_level,
        size,
        category: {
          in: category
        },
        org_id: {
          in: orgs
        }
      }
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id
      }
    })

    return pet
  }
}

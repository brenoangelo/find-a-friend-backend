import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { PetNotFoundError } from "@/use-cases/errors/pet-not-found";
import { FindPetByIdUseCase } from "@/use-cases/find-pet-by-id";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository
let sut: FindPetByIdUseCase;

describe("Fetch pets Use Case", async () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindPetByIdUseCase(petsRepository, orgsRepository);

    await orgsRepository.create({
      id: 'org-01',
      name: 'Breno Pets',
      address: 'Rua Pedro Alves de Morais',
      city: 'Timon',
      email: "brenoangeloal@gmail.com",
      number: 760,
      password_hash: await hash('123456', 6),
      phone: '(86) 99982-0862',
      state: 'MA',
    })

    await petsRepository.create({
      name: "Frida",
      age_group: 'SENIOR',
      about: "Exemplo de texto",
      category: 'DOG',
      energy_level: 5,
      size: "MEDIUM",
      independence: "MEDIUM",
      org_id: "org-01",
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "123",
    });
  });

  it("should find pet by id", async () => {
    const { pet } = await sut.execute({
      id: "123",
    });

    expect(pet).toEqual(
      expect.objectContaining({
        name: "Frida",
        age_group: 'SENIOR',
        about: "Exemplo de texto",
        energy_level: 5,
        size: "MEDIUM",
        independence: "MEDIUM",
        org_id: "org-01",
        photos: [],
        id: "123",
      }),
    );
  });

  it("should find org by pet id", async () => {
    const { orgInfo } = await sut.execute({
      id: "123",
    });

    expect(orgInfo).toEqual(
      expect.objectContaining({
        name: 'Breno Pets',
        address: 'Rua Pedro Alves de Morais',
        city: 'Timon',
        number: 760,
        phone: '(86) 99982-0862',
        state: 'MA',
      }),
    );
  });

  it("should show error when pet id does not exists", async () => {
    await expect(() =>
      sut.execute({
        id: "124",
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError);
  });
});

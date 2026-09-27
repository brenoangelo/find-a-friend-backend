import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgEmailAlreadyExistsError } from "@/use-cases/errors/org-email-already-exists-error";
import { RegisterOrgUseCase } from "@/use-cases/register-org";
import { compare } from "bcryptjs";
import { beforeEach } from "vitest";
import { describe, expect, it } from "vitest";

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Breno Pets',
      address: 'Rua Pedro Alves de Morais',
      city: 'Timon',
      email: "brenoangeloal@gmail.com",
      number: 760,
      password: '123456',
      phone: '(86) 99982-0862',
      state: 'MA'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Breno Pets',
      address: 'Rua Pedro Alves de Morais',
      city: 'Timon',
      email: "brenoangeloal@gmail.com",
      number: 760,
      password: '123456',
      phone: '(86) 99982-0862',
      state: 'MA'
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should be able to register', async () => {
    await sut.execute({
      name: 'Breno Pets',
      address: 'Rua Pedro Alves de Morais',
      city: 'Timon',
      email: "brenoangeloal@gmail.com",
      number: 760,
      password: '123456',
      phone: '(86) 99982-0862',
      state: 'MA'
    })

    await expect(() => sut.execute({
      name: 'Breno Pets',
      address: 'Rua Pedro Alves de Morais',
      city: 'Timon',
      email: "brenoangeloal@gmail.com",
      number: 760,
      password: '123456',
      phone: '(86) 99982-0862',
      state: 'MA'
    })).rejects.toBeInstanceOf(OrgEmailAlreadyExistsError)

  })
})

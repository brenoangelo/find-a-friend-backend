import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { beforeEach } from "vitest";
import { describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Register Org Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)

    orgsRepository.create({
      name: 'Breno Pets',
      address: 'Rua Pedro Alves de Morais',
      city: 'Timon',
      email: "brenoangeloal@gmail.com",
      number: '760',
      password_hash: await hash('123456', 6),
      phone: '(86) 99982-0862',
      state: 'MA'
    })
  })

  it('should be able to authenticate', async () => {
    const { org } = await sut.execute({
      email: 'brenoangeloal@gmail.com',
      password: '123456'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'fulano@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() => sut.execute({
      email: 'brenoangeloal@gmail.com',
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgEmailAlreadyExistsError } from "@/use-cases/errors/org-email-already-exists-error";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterOrgUseCaseRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  number: number
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    address,
    city,
    email,
    name,
    password,
    phone,
    state,
    number
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if(orgWithSameEmail) {
      throw new OrgEmailAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      address,
      name,
      email,
      city,
      state,
      number,
      phone,
      password_hash,
    })

    return {
      org
    }
  }
}

import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(orgId: string){
    const org = this.items.find(item => item.id === orgId)

    if(!org) return null

    return org
  }

  async findOrgsByCity(city: string){
    const orgs = this.items.filter(item => item.city === city)

    return orgs
  }

  async findByEmail(email: string){
    const org = this.items.find(item => item.email === email)

    if(!org) return null

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org: Org = {
      number: data.number,
      name: data.name,
      id: data.id ?? randomUUID(),
      email: data.email,
      city: data.city,
      state: data.state,
      address: data.address,
      phone: data.phone,
      password_hash: data.password_hash,
      createdAt: new Date(),
      updateAt: new Date()
    }

    this.items.push(org)

    return org
  }
}

import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findById(orgId: string): Promise<Org | null>
  findOrgsByCity(city: string): Promise<Org[]>
}

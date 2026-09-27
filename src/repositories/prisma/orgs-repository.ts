import { prisma } from "@/lib/prisma";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Prisma } from "@prisma/client";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = await prisma.org.create({
      data,
    });
    return org;
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    });

    return org;
  }
  async findById(orgId: string) {
    const org = await prisma.org.findFirst({
      where: {
        id: orgId,
      },
    });

    return org;
  }
  async findOrgsByCity(city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      }
    });

    return orgs;
  }
}

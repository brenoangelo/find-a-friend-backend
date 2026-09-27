import { PrismaPg } from '@prisma/adapter-pg'
import { env } from "@/env"
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL!
const url = new URL(connectionString)
const schema = url.searchParams.get('schema') ?? 'public'

const adapter = new PrismaPg({ connectionString, options: `-c search_path=${schema}` }, { schema })

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

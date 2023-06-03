// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/client.ts'

type Data = {
  umidade: number
  fluxo: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { umidade, fluxo } = prisma.umidade_solo.findFirst({
    orderBy: {
      id: 'desc'
    }
  })

  res.status(200).json({ umidade, fluxo })
}

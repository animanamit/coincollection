import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filters } = req.body;

  console.log(req.body);

  let filterObj: any = [];

  filters.forEach((item: string) => {
    filterObj.push({
      ruler: item,
    });
  });

  try {
    const coinsViaFilters = await prisma.coin.findMany({
      where: {
        OR: [...filterObj],
      },
      include: {
        sets: true,
      },
    });
    return res.status(200).json({ coinsViaFilters });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}

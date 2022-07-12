import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { updatedData } = req.body;
  console.log(updatedData);
  try {
    const updatedCoin = await prisma.coin.update({
      where: {
        id: updatedData.id,
      },
      data: {
        name: updatedData.name,
        coinage: updatedData.coinage,
        ruler: updatedData.ruler,
        period: updatedData.period,
        type: updatedData.type,
        year: updatedData.year,
        class: updatedData.class,
        denomination: updatedData.denomination,
        variety: updatedData.variety,
        catalogueNumber: updatedData.catalogueNumber,
        weight: updatedData.weight,
        grade: updatedData.grade,
        rarity: updatedData.rarity,
        page: updatedData.page,
        remarks: updatedData.remarks,
        rating: updatedData.rating,
        obs: updatedData.obs,
        rev: updatedData.rev,
        obsPhoto: updatedData.obsPhoto,
        revPhoto: updatedData.revPhoto,
        obsRemarkPhoto: updatedData.obsRemarkPhoto,
        revRemarkPhoto: updatedData.revRemarkPhoto,
        sequenceNumber: updatedData.sequenceNumber,
        status: updatedData.status,
      },
    });
    console.log("success!!!!!");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}

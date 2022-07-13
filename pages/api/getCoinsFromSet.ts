import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  let { id } = req.body;
  console.log("inside add coin to set", id);
  try {
    let submission = await prisma.coinsOnSets.findMany({
      where: {
        setId: 2,
        coin: {
          coinage: "Assam",
        },
      },
      include: {
        coin: true,
      },
    });
    console.log(submission);
    console.log("success!!!!!");
    return res.status(200).json({
      submission,
    });
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}

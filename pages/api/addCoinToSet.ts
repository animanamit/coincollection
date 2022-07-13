import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  let { id } = req.body;
  console.log("inside add coin to set", id);
  try {
    let submission = await prisma.coinsOnSets.create({
      data: {
        coinId: id,
        setId: 2,
      },
    });

    console.log("success!!!!!");
    return res
      .status(200)
      .json({ message: "Data uploaded successfully!", success: true });
  } catch (error) {
    console.error("Request error", error);
    return res.status(400).json({ error, success: false });
  }
}

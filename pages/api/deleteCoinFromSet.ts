import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  let { relationId } = req.body;
  console.log(relationId);
  try {
    let submission = await prisma.coinsOnSets.delete({
      where: {
        id: relationId,
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

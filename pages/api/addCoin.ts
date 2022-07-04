import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  let dataObj = req.body;

  try {
    const submission = await prisma.coin.create({ data: dataObj });
    console.log("success!!!!!");
    return res
      .status(200)
      .json(
        { message: "Data uploaded successfully!", success: true },
        submission
      );
  } catch (error) {
    console.error("Request error", error);
    return res.status(500).json({ error, success: false });
  }
}

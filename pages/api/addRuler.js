import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;

      const ruler = await prisma.ruler.create({
        data: { name },
      });

      res.status(200).json(ruler);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

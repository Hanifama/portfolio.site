import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const dataFilePath = path.join(process.cwd(), "public", "data.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const { ratings } = req.body;
    jsonData.ratings = ratings;

    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return res.status(200).json({ message: "Rating saved successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error saving rating", error });
  }
}

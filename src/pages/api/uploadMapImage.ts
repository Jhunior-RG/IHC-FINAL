import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { imageData } = req.body;
    if (!imageData) return res.status(400).json({ error: "No image data" });

    // Genera un nombre único
    const fileName = `map_${Date.now()}.png`;
    const dirPath = path.join(process.cwd(), "public", "ubicaciones");
    const filePath = path.join(dirPath, fileName);

    // Asegura que la carpeta existe
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Quita el encabezado "data:image/png;base64,"
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");

    // Guarda la imagen
    fs.writeFileSync(filePath, base64Data, "base64");

    // Devuelve la ruta pública
    res.status(200).json({ url: `/ubicaciones/${fileName}` });
} 
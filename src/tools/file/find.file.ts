import fs from "fs";
import path from "path";


export const findFileByPrefix = async (
  prefix: string,
  folderPath: string,
  ouptupPath: string
): Promise<string | null> => {
  try {
    const items = await fs.promises.readdir(folderPath);

    const fileName = items.find((name) => name.startsWith(prefix));
    if (!fileName) return null;

    return path.join(ouptupPath, fileName);
  } catch (err) {
    console.error("Error reading directory:", err);
    return null;
  }
}
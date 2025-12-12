import { getBrands, type BrandRowData } from "../data/csv";
import slugify from "slugify";
import { JsonDB, Config } from 'node-json-db';
import { brandInvestigationAgent } from "../ai/brand.ai";
import fs from "fs";
import path from "path";

const db = new JsonDB(new Config("data/brands/storage", true, false, '/'));

type BrandData = {
  slug: string;
  name: string;
  url: string
  description: string;
  extract: string;
};

const processBrands = async () => {
  const brands = await getBrands();
  for (const brand of brands) {
    console.log(`Processing brand ${brand.Name}`);
    await processBrand(brand);
  }
}

const findFileByPrefix = async (
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

const processBrand = async (brand: BrandRowData, reprocess: boolean = false) => {
  const slug = slugify(brand.Name, { lower: true });

  if (!reprocess && await db.exists(`/brands/${slug}`)) {
    console.log(`Brand ${brand.Name} already processed`);
    return;
  }

  const result = await brandInvestigationAgent(brand)

  await db.push(`/brands/${slug}`, {
    slug,
    name: brand.Name,
    url: brand.Site,
    // response: result.response.body,
    description: result.output.description,
    extract: result.output.extract,
  });

  await generateMarkdown(brand);
}

const generateMarkdown = async (brand: BrandRowData) => {
  const slug = slugify(brand.Name, { lower: true });
  const data = await db.getObject<BrandData>(`/brands/${slug}`);
  let order = 0;

  const content = `\
---
name: "${data.name}"
description: "${data.extract}"
logo: "${await findFileByPrefix(slug, "public/images/brands", "/images/brands/") || ""}"
website: "${data.url}"
images: []
order: ${order} 
---

${data.description}
    `;

  await fs.promises.writeFile(`src/content/brands/${slug}.mdx`, content);

}


// const brands = await getBrands();
// for (const brand of brands) {
//   console.log(`Processing brand ${brand.Name}`);
//   await generateMarkdown(brand);
// }

processBrands().then(() => console.log("Done"));
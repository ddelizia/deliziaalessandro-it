import { getBrands, getCategories, type BrandRowData, type CategoryRowData } from "../data/csv";
import slugify from "slugify";
import { JsonDB, Config } from 'node-json-db';
import fs from "fs";
import { categoryInvestigationAgent } from "../ai/category.ai";


const db = new JsonDB(new Config("data/categories/storage", true, false, '/'));

type CategoryData = {
  slug: string;
  name: string;
  content: string;
  extract: string;
};

const processCategories = async () => {
  const categories = await getCategories();
  for (const category of categories) {
    console.log(`Processing category ${category.Name}`);
    await processCategory(category);
  }
}

const processCategory = async (category: CategoryRowData, reprocess: boolean = false) => {
  const slug = slugify(category.Name, { lower: true });

  if (!reprocess && await db.exists(`/categories/${slug}`)) {
    console.log(`Category ${category.Name} already processed`);
    return;
  }

  const result = await categoryInvestigationAgent(category)

  await db.push(`/categories/${slug}`, {
    slug,
    name: category.Name,
    extract: result.output.extract,
    // response: result.response.body,
    content: result.output.content,
  });

  await generateMarkdown(category);
}

const generateMarkdown = async (category: CategoryRowData) => {
  const slug = slugify(category.Name, { lower: true });
  const data = await db.getObject<CategoryData>(`/categories/${slug}`);

  const content = `\
---
name: "${data.name}"
description: "${data.extract}"
---

${data.content}
    `;

  await fs.promises.writeFile(`src/content/categories/${slug}.mdx`, content);

}

processCategories().then(() => console.log("Done"));

import csvParser from 'csv-parser';
import fs from 'fs';

export type BrandRowData = {
  Name: string;
  Site: string;
  Category: string;
};

export const getBrands = async (): Promise<BrandRowData[]> => {
  const brands: BrandRowData[] = [];
  const brandFilePath: string = './data/brands/brands.csv';
  return new Promise((resolve, reject) => {
    fs.createReadStream(brandFilePath)
      .pipe(csvParser({ separator: ',' }))
      .on('data', (row: BrandRowData) => {
        brands.push(row);
      })
      .on('end', () => {
        resolve(brands);
      })
      .on('error', (error) => {
        reject(error);
      });
  });

};

export type CategoryRowData = {
  Name: string;
};

export const getCategories = async(): Promise<CategoryRowData[]> => {
  const categories: CategoryRowData[] = [];
  const brandFilePath: string = './data/categories/categories.csv';
  return new Promise((resolve, reject) => {
    fs.createReadStream(brandFilePath)
      .pipe(csvParser({ separator: ',' }))
      .on('data', (row: CategoryRowData) => {
        categories.push(row);
      })
      .on('end', () => {
        resolve(categories);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

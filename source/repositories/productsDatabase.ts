import schema from "../repositories/productSchema";
import { Product } from "../repositories/entities";
import moment from "moment";
import fs from "fs";
import util from "util";

const fileName = "./source/repositories/products.json";

const getAll = async (): Promise<Product[]> => {
  let products: Product[] = [];

  try {
    products = await readDataFromFile();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return products;
};

const getById = async (id: string): Promise<Product | undefined> => {
  try {
    const products: Product[] = await readDataFromFile();

    const product = await findProduct(id, products);
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const create = async (data: any): Promise<Product | undefined> => {
  let id: number = 0;

  const { error } = schema.create.validate(data, { convert: false }); // Trzeba doda właściwość convert, bo inaczej są problemy z walidacją precyzji liczby
  if (error) {
    throw new Error(error.message);
  }

  try {
    const products: Product[] = await readDataFromFile();

    products.forEach((product) => {
      if (product.id > id) {
        id = product.id;
      }
    });
    id++;

    const { name, price } = data;

    const product: Product = {
      id,
      name,
      price,
      updateDate: moment().format("YYYY-MM-DD"),
    };

    products.push(product);
    await writeDataToFile(products);

    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const update = async (id: string, data: any): Promise<Product | undefined> => {
  const { error } = schema.update.validate(data, { convert: false }); // Trzeba doda właściwość convert, bo inaczej są problemy z walidacją precyzji liczby
  if (error) {
    throw new Error(error.message);
  }

  try {
    let products: Product[];
    let product: Product | undefined;

    products = await readDataFromFile();
    product = await findProduct(id, products);

    if (product) {
      const { name, price } = data;

      if (name) {
        product.name = name;
      }
      if (price) {
        product.price = price;
      }
      product.updateDate = moment().format("YYYY-MM-DD");
      await writeDataToFile(products);

      product = await findProduct(id, products);

      return product;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const remove = async (id: string): Promise<void> => {
  try {
    let products: Product[] = await readDataFromFile();

    const oldLength: number = products.length;

    products = products.filter(
      (product: Product) => product.id !== parseInt(id)
    );

    if (oldLength !== products.length) {
      await writeDataToFile(products);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const readDataFromFile = async (): Promise<Product[]> => {
  let products: Product[] = [];

  const readFile = util.promisify(fs.readFile);

  try {
    const data = await readFile(fileName, { encoding: "utf8" });
    products = JSON.parse(data) as Product[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  return products;
};

const writeDataToFile = async (products: Product[]): Promise<void> => {
  const writeFile = util.promisify(fs.writeFile);

  try {
    await writeFile(fileName, JSON.stringify(products));
  } catch (error) {
    throw error;
  }
};

const findProduct = async (
  id: string,
  products: Product[]
): Promise<Product | undefined> => {
  const product: Product | undefined = products.find(
    (product: Product) => product.id === parseInt(id)
  );

  return product;
};

const database = { getAll, getById, create, update, remove };
export = database;

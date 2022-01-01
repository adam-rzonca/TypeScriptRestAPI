import schema from "../repositories/productSchema";
import { Product } from "../repositories/entities";
import moment from "moment";
import fs, { read } from "fs";
import util from "util";

const fileName = "./source/repositories/products.json";

const getAll = async () => {
  try {
    const products = await readDataFromFile();

    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const getById = async (id: any) => {
  try {
    const products: Product[] = await readDataFromFile();

    return await findProduct(id, products);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const create = async (data: any) => {
  let id = 0;

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

const update = async (data: any) => {
  const { id } = data;

  let products: Product[];
  let product: Product;

  const { error } = schema.update.validate(data, { convert: false }); // Trzeba doda właściwość convert, bo inaczej są problemy z walidacją precyzji liczby
  if (error) {
    throw new Error(error.message);
  }

  try {
    products = await readDataFromFile();
    product = await findProduct(id, products);

    if (product) {
      const { name, price } = data;

      product.name = name;
      product.price = price;
      product.updateDate = moment().format("YYYY-MM-DD");
      await writeDataToFile(products);
    }

    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const remove = async (id: any) => {
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

const database = { getAll, getById, create, update, remove };
export = database;

const readDataFromFile = async () => {
  const readFile = util.promisify(fs.readFile);
  try {
    const data = await readFile(fileName, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const writeDataToFile = async (products: Product[]) => {
  const writeFile = util.promisify(fs.writeFile);

  try {
    await writeFile(fileName, JSON.stringify(products));
  } catch (error) {
    throw error;
  }
};

const findProduct = async (id: any, products: Product[]) => {
  const product: Product = products.find(
    (product: Product) => product.id === parseInt(id)
  ) as Product; // ??? To jest chyba dziwne, ale bez tego robi się bład "kompilacji". Jak go obejść?

  return product;
};

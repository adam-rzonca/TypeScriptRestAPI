import { ServiceResponse } from "../services/serviceResponse";
import database from "../repositories/productsDatabase";

const getAll = async () => {
  const response: ServiceResponse = { statusCode: 400, data: {} };

  try {
    const products = await database.getAll();
    response.statusCode = 200;
    response.data = products;
  } catch (error) {
    if (error instanceof Error) {
      response.data = { error: error.message };
    }
  }
  return response;
};

const getById = async (id: any) => {
  const response: ServiceResponse = { statusCode: 400, data: {} };

  try {
    const product = await database.getById(id);

    if (product) {
      response.statusCode = 200;
      response.data = product;
    } else {
      response.statusCode = 404;
      response.data = { error: "Product not found" };
    }
  } catch (error) {
    if (error instanceof Error) {
      response.data = { error: error.message };
    }
  }

  return response;
};

const create = async (data: any) => {
  const response: ServiceResponse = { statusCode: 400, data: {} };

  try {
    const product = await database.create(data);

    if (product) {
      response.statusCode = 201;
      response.data = product;
    }
  } catch (error) {
    if (error instanceof Error) {
      response.data = { error: error.message };
    }
  }

  return response;
};

const update = async (data: any) => {
  const response: ServiceResponse = { statusCode: 400, data: {} };

  try {
    const product = await database.update(data);

    if (product) {
      response.statusCode = 200;
      response.data = product;
    } else {
      response.statusCode = 404;
      response.data = { error: "Product not found" };
    }
  } catch (error) {
    if (error instanceof Error) {
      response.data = { error: error.message };
    }
  }

  return response;
};

const remove = async (id: any) => {
  const response: ServiceResponse = { statusCode: 400, data: {} };

  try {
    await database.remove(id);
    response.statusCode = 204;
  } catch (error) {
    if (error instanceof Error) {
      response.data = { error: error.message };
    }
  }

  return response;
};

const service = { getAll, getById, create, update, remove };
export { service };

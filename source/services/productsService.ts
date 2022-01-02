import {
  ServiceResponse,
  productNotFoundResponse,
  productInitialResponse,
} from "../services/serviceResponse";
import { Product } from "../repositories/entities";
import database from "../repositories/productsDatabase";

const getAll = async (): Promise<ServiceResponse> => {
  const response: ServiceResponse = productInitialResponse;

  try {
    const products: Product[] = await database.getAll();
    response.statusCode = 200;
    response.data = products;
  } catch (error) {
    if (error instanceof Error) {
      response.data = { error: error.message };
    }
  }
  return response;
};

const getById = async (id: string): Promise<ServiceResponse> => {
  let response: ServiceResponse = productInitialResponse;

  try {
    const product: Product | undefined = await database.getById(id);

    if (product) {
      response.statusCode = 200;
      response.data = product;
    } else {
      response = productNotFoundResponse;
    }
  } catch (error) {
    if (error instanceof Error) {
      response.data = { error: error.message };
    }
  }

  return response;
};

const create = async (data: any): Promise<ServiceResponse> => {
  const response: ServiceResponse = productInitialResponse;

  try {
    const product: Product | undefined = await database.create(data);

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

const update = async (id: string, data: any): Promise<ServiceResponse> => {
  let response: ServiceResponse = productInitialResponse;

  try {
    const product: Product | undefined = await database.update(id, data);

    if (product) {
      response.statusCode = 200;
      response.data = product;
    } else {
      response = productNotFoundResponse;
    }
  } catch (error) {
    if (error instanceof Error) {
      response.data = { error: error.message };
    }
  }

  return response;
};

const remove = async (id: string): Promise<ServiceResponse> => {
  let response: ServiceResponse = productInitialResponse;

  try {
    const product: Product | undefined = await database.getById(id);

    if (!product) {
      response = productNotFoundResponse;
    } else {
      await database.remove(id);
      response.statusCode = 204;
    }
  } catch (error) {
    if (error instanceof Error) {
      response.data = { error: error.message };
    }
  }

  return response;
};

const service = { getAll, getById, create, update, remove };
export { service };

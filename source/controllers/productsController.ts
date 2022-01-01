import { Request, Response, NextFunction } from "express";
import { service } from "../services/productsService";
import { ServiceResponse } from "../services/serviceResponse";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const serviceResponse: ServiceResponse = await service.getAll();
  res.status(serviceResponse.statusCode).send(serviceResponse.data);
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;

  const serviceResponse: ServiceResponse = await service.getById(id);
  res.status(serviceResponse.statusCode).send(serviceResponse.data);
};

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const body: any = req.body;

  const serviceResponse: ServiceResponse = await service.create(body);
  res.status(serviceResponse.statusCode).send(serviceResponse.data);
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: any = req.body;

  /* ??? Co z przekazywnaime id? W body, czy w url? Jak to się ma do wymagań walidacji z zadania? */
  const serviceResponse: ServiceResponse = await service.update(body);
  res.status(serviceResponse.statusCode).send(serviceResponse.data);
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;

  const serviceResponse: ServiceResponse = await service.remove(id);
  res.status(serviceResponse.statusCode).send(serviceResponse.data);
};

export default {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};

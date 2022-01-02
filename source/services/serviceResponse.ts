export interface ServiceResponse {
  statusCode: number;
  data: object;
}

const productNotFoundResponse: ServiceResponse = {
  statusCode: 404,
  data: { error: "Product not found" },
};

const productInitialResponse: ServiceResponse = {
  statusCode: 400,
  data: {},
};

export { productNotFoundResponse, productInitialResponse };

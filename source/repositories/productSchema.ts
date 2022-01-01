import Joi from "joi";

const productId = Joi.number();
const productName = Joi.string().max(100);
const productPrice = Joi.number().greater(0).precision(2);

const create = Joi.object({
  name: productName.required(),
  price: productPrice.required(),
});

const update = Joi.object({
  id: productId.required(),
  name: productName.required(),
  price: productPrice.required(),
});

const schema = { create, update };
export = schema;

import Joi from "joi";

const productName = Joi.string().max(100);
const productPrice = Joi.number().greater(0).precision(2);

const create = Joi.object({
  name: productName.required(),
  price: productPrice.required(),
});

const update = Joi.object({
  name: productName,
  price: productPrice,
}).min(1);

const schema = { create, update };
export = schema;

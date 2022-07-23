import Joi from "joi";

const categorySchema = Joi.object({
    name: Joi.string().trim().required(),
});

const gameSchema = Joi.object({
    name: Joi.string().trim().required(),
    stockTotal: Joi.number().positive().required(),
    pricePerDay: Joi.number().positive().required(),
    image: Joi.string().trim().required().uri(),
    categoryId: Joi.number().positive().required(),
});

const customerSchema = Joi.object({
    name: Joi.string().trim().required(),
    phone: Joi.string().min(10).max(11).pattern(/^[0-9]+$/, 'numbers').trim().required(),
    cpf: Joi.string().trim().required().length(11).pattern(/^[0-9]+$/, 'numbers'),
    birthday: Joi.date().required(),
});
// TODO: implement Max Date

export { categorySchema, gameSchema, customerSchema };
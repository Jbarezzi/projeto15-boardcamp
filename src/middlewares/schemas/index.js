import Joi from "joi";

const categorySchema = Joi.object({
    name: Joi.string().trim().required(),
});

const gameSchema = Joi.object({
    name: Joi.string().trim().required(),
    stockTotal: Joi.number().positive().required(),
    pricePerDay: Joi.number().positive().required(),
    image: Joi.string().trim().required(),
    categoryId: Joi.number().positive().required(),
});

export { categorySchema, gameSchema };
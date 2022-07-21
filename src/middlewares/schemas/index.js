import Joi from "joi";

const categorySchema = Joi.object({
    name: Joi.string().trim().required(),
});

export { categorySchema };
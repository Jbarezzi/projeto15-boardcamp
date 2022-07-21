import { categorySchema } from "./../schemas/index.js";

async function validateCategory(req, res, next) {
    const category = req.body;
    try {
        await categorySchema.validateAsync(category);
        next();
    } catch(error) {
        res.status(400).send(error.details);
    }
}

export default validateCategory;
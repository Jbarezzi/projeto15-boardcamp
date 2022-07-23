import { customerSchema } from "./../schemas/index.js";

async function validateCustomer(req, res, next) {
    const customer = req.body;
    try {
        await customerSchema.validateAsync(customer);
        next();
    } catch(error) {
        res.status(400).send(error.details);
    }
}

export default validateCustomer;
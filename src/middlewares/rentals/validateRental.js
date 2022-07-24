import { rentalSchema } from "./../schemas/index.js";

async function validateRental(req, res, next) {
    const rental = req.body;
    try {
        await rentalSchema.validateAsync(rental);
        next();
    } catch(error) {
        res.status(400).send(error.details);
    }
}

export default validateRental;
import { gameSchema } from "./../schemas/index.js";

async function validateGame(req, res, next) {
    const game = req.body;
    try {
        await gameSchema.validateAsync(game);
        next();
    } catch(error) {
        res.status(400).send(error.details);
    }
}

export default validateGame;
import { Router } from "express";
import { getGames } from "../controllers/gamesController.js";
import checkIfGameAndCategoryExists from "../middlewares/games/checkIfGameAndCategoryExists.js";
import validateGame from "../middlewares/games/validateGame.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateGame, checkIfGameAndCategoryExists)

export default gamesRouter;
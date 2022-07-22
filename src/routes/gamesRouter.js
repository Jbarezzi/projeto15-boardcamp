import { Router } from "express";
import { createGame, getGames } from "../controllers/gamesController.js";
import checkIfGameAndCategoryExists from "../middlewares/games/checkIfGameAndCategoryExists.js";
import validateGame from "../middlewares/games/validateGame.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateGame, checkIfGameAndCategoryExists, createGame);

export default gamesRouter;
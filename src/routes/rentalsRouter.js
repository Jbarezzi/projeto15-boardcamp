import { Router } from "express";
import { getRentals } from "../controllers/rentalsController.js";
import checkIfCustomerIsValid from "../middlewares/rentals/checkIfCustomerIsValid.js";
import validateRental from "../middlewares/rentals/validateRental.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, checkIfCustomerIsValid, );
rentalsRouter.post("/rentals/:id/return");

export default rentalsRouter;
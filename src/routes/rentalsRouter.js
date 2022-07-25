import { Router } from "express";
import { createRental, deleteRental, getRentals, returnRental } from "../controllers/rentalsController.js";
import checkIfCustomerIsValid from "../middlewares/rentals/checkIfCustomerIsValid.js";
import checkIfGameIsAvailable from "../middlewares/rentals/checkIfGameIsAvailable.js";
import checkIfRentalExists from "../middlewares/rentals/checkIfRentalExists.js";
import validateRental from "../middlewares/rentals/validateRental.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, checkIfCustomerIsValid, checkIfGameIsAvailable, createRental);
rentalsRouter.post("/rentals/:id/return", checkIfRentalExists, returnRental);
rentalsRouter.delete("/rentals/:id", checkIfRentalExists, deleteRental);

export default rentalsRouter;
import { Router } from "express";
import { getCustomers, getCustomersById } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);

export default customersRouter;
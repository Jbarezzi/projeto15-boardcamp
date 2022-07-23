import { Router } from "express";
import { createCustomer, getCustomers, getCustomersById } from "../controllers/customersController.js";
import checkIfCustomerExists from "../middlewares/customers/checkIfCustomerExists.js";
import validateCustomer from "../middlewares/customers/validateCustomer.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", validateCustomer, checkIfCustomerExists, createCustomer);

export default customersRouter;
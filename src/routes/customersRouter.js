import { Router } from "express";
import { createCustomer, getCustomers, getCustomersById, updateCustomer } from "./../controllers/customersController.js";
import checkIfCustomerExists from "./../middlewares/customers/checkIfCustomerExists.js";
import validateCustomer from "./../middlewares/customers/validateCustomer.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", validateCustomer, checkIfCustomerExists, createCustomer);
customersRouter.put("/customers/:id", validateCustomer, checkIfCustomerExists, updateCustomer);

export default customersRouter;
import { Router } from "express";
import { getCategories } from "./../controllers/categoriesController.js";
import validateCategory from "./../middlewares/categories/validateCategory.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", validateCategory, checkIfCategoryExists, createCategory);

export default categoriesRouter;
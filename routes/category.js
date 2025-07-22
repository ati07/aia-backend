import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.js";
import logUserAction from "../middleware/logUserAction.js";

const CategoryRouter = Router();
// auth,
CategoryRouter.post('/', auth, logUserAction('Created a Category'),createCategory);
CategoryRouter.get('/', auth, logUserAction('Fetched Category'),getCategory);
CategoryRouter.patch('/:categoryId', auth,logUserAction('Deleted a Category'),deleteCategory);
CategoryRouter.put('/:categoryId', auth, logUserAction('Updated a Category'),updateCategory);

export default CategoryRouter;
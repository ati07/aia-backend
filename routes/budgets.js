import { Router } from "express";
import auth from "../middleware/auth.js";
import { createBudgets, deleteBudgets, getBudgets, updateBudgets } from "../controllers/budgets.js";
import logUserAction from "../middleware/logUserAction.js";

const BudgetsRouter = Router();

BudgetsRouter.post('/', auth,  logUserAction('Created payment for Budgets'),createBudgets);
BudgetsRouter.get('/', auth,  logUserAction('Fetched payments of Budgets Data'),getBudgets);
BudgetsRouter.patch('/:budgetsId', auth, logUserAction('Deleteded Budgets payment'),deleteBudgets);
BudgetsRouter.put('/:budgetsId', auth,  logUserAction('Updated Budgets payment'),updateBudgets);

export default BudgetsRouter;
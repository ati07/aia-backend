import { Router } from "express";
import auth from "../middleware/auth.js";
import { createBills, deleteBills, getBills, updateBills } from "../controllers/bills.js";
import logUserAction from "../middleware/logUserAction.js";

const BillsRouter = Router();

BillsRouter.post('/', auth,  logUserAction('Created payment for Bills'),createBills);
BillsRouter.get('/', auth,  logUserAction('Fetched payments of Bills Data'),getBills);
BillsRouter.patch('/:billsId', auth, logUserAction('Deleteded Bills payment'),deleteBills);
BillsRouter.put('/:billsId', auth,  logUserAction('Updated Bills payment'),updateBills);

export default BillsRouter;
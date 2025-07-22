import { Router } from "express";
import auth from "../middleware/auth.js";
import { createPaidFrom, deletePaidFrom, getPaidFrom, updatePaidFrom } from "../controllers/paidFrom.js";
import logUserAction from "../middleware/logUserAction.js";

const PaidFromRouter = Router();
// auth,
PaidFromRouter.post('/', auth, logUserAction('Created a PaidFrom'),createPaidFrom);
PaidFromRouter.get('/', auth, logUserAction('Fetched PaidFrom'),getPaidFrom);
PaidFromRouter.patch('/:paidFromId', auth,logUserAction('Deleted a PaidFrom'),deletePaidFrom);
PaidFromRouter.put('/:paidFromId', auth, logUserAction('Updated a PaidFrom'),updatePaidFrom);

export default PaidFromRouter;
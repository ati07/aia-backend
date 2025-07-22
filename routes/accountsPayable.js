import { Router } from "express";
import auth from "../middleware/auth.js";
import { createAccountPayable, deleteAccountPayable, getAccountPayable, updateAccountPayable } from "../controllers/AccountPayable.js";
import logUserAction from "../middleware/logUserAction.js";

const AccountPayableRouter = Router();

AccountPayableRouter.post('/', auth,  logUserAction('Created payment for AccountPayable'),createAccountPayable);
AccountPayableRouter.get('/', auth,  logUserAction('Fetched payments of Administrotor Data'),getAccountPayable);
AccountPayableRouter.patch('/:accountPayableId', auth, logUserAction('Deleteded AccountPayable payment'),deleteAccountPayable);
AccountPayableRouter.put('/:accountPayableId', auth,  logUserAction('Updated AccountPayable payment'),updateAccountPayable);

export default AccountPayableRouter;
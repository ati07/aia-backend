import { Router } from "express";
import auth from "../middleware/auth.js";
import { createService, deleteService, getService, updateService } from "../controllers/service.js";
import logUserAction from "../middleware/logUserAction.js";

const ServiceRouter = Router();
// auth,
ServiceRouter.post('/', auth, logUserAction('Created a Service'),createService);
ServiceRouter.get('/', auth, logUserAction('Fetched Service'),getService);
ServiceRouter.patch('/:serviceId', auth,logUserAction('Deleted a Service'),deleteService);
ServiceRouter.put('/:serviceId', auth, logUserAction('Updated a Service'),updateService);

export default ServiceRouter;
import { Router } from "express";
import auth from "../middleware/auth.js";
import { adjustAmount, createProject, deleteProject, getProject, updateProject } from "../controllers/project.js";
import logUserAction from "../middleware/logUserAction.js";

const ProjectRouter = Router();
// auth,
ProjectRouter.post('/', auth, logUserAction('Created a Project'),createProject);
ProjectRouter.get('/', auth, logUserAction('Fetched Project'),getProject);
ProjectRouter.patch('/:projectId', auth,logUserAction('Deleted a Project'),deleteProject);
ProjectRouter.put('/:projectId', auth, logUserAction('Updated a Project'),updateProject);


ProjectRouter.post('/adjust_amount', auth, logUserAction('Adjusted Project Amount'), adjustAmount);
export default ProjectRouter;
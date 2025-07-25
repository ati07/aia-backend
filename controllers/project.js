import Project from '../models/project.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createProject= tryCatch(async (req, res) => {

  //Todo:  error handling

  let ProjectPayload = req.body
  ProjectPayload.addedBy = req.auth.user._id
  ProjectPayload.reminder = ProjectPayload.budget // Assuming reminder is the same as budget, adjust as needed

  const newProject= new Project(ProjectPayload);

  await newProject.save()
  res.status(200).json({ success: true, message: 'Project added successfully' });

})

// create getClient
export const getProject= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const Projects = await Project.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: Projects});
});

//  delete Client
export const deleteProject= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findProject={
    _id: req.params.projectId
  }
  const c = await Project.updateOne(findProject,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Project and all the related data deleted successfully' });
});



export const updateProject = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findProject={
    _id: req.params.projectId
  }
  const updatedProject = await Project.updateOne(findProject,updateData)
  let message = 'Project edited successfully'

  res.status(200).json({ success: true, message: message })
});


export const adjustAmount = tryCatch(async (req, res) => {
  const { projectId1, projectId2, budget2 } = req.body;

  // Get project 1
  const project1 = await Project.findOne({ _id: projectId1 });
  if (!project1) {
    return res.status(404).json({ success: false, message: 'Project 1 not found' });
  }
  // Subtract budget2 from both budget and remainder of project 1
  const updatedBudget1 = (parseFloat(project1.budget) - parseFloat(budget2)).toString();
  const updatedRemainder1 = (parseFloat(project1.remainder) - parseFloat(budget2)).toString();
  const project1Update = {
    budget: updatedBudget1,
    remainder: updatedRemainder1
  };
  const updatedProject1 = await Project.updateOne(
    { _id: projectId1 },
    { $set: project1Update }
  );

  // Get project 2
  const project2 = await Project.findOne({ _id: projectId2 });
  if (!project2) {
    return res.status(404).json({ success: false, message: 'Project 2 not found' });
  }
  // Add budget2 to both budget and remainder of project 2
  const updatedBudget2 = (parseFloat(project2.budget) + parseFloat(budget2)).toString();
  const updatedRemainder2 = (parseFloat(project2.remainder) + parseFloat(budget2)).toString();
  const project2Update = {
    budget: updatedBudget2,
    remainder: updatedRemainder2
  };
  const updatedProject2 = await Project.updateOne(
    { _id: projectId2 },
    { $set: project2Update }
  );

  if (!updatedProject1 || !updatedProject2) {
    return res.status(400).json({ success: false, message: 'Failed to update projects' });
  }

  res.status(200).json({ success: true, message: 'Projects budgets adjusted successfully' });
});

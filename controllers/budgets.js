import Budgets from '../models/budgets.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createBudgets= tryCatch(async (req, res) => {

  //Todo:  error handling

  let BudgetsPayload = req.body
  BudgetsPayload.addedBy = req.auth.user._id
  
  const newBudgets= new Budgets(BudgetsPayload);

  await newBudgets.save()
  res.status(200).json({ success: true, message: 'Budgets added successfully' });

})

// create getClient
export const getBudgets= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.projectId) {
    findData['projectId'] = req.query.projectId
  }

  // if (req.query.projectId) {
  //   findData['statusId'] = req.query.statusId
  // }

  const Budget = await Budgets.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'categoryId', model:'category'},
    { path: 'serviceId', model:'service'},
    { path:'projectId',model: 'projects' },
    { path:'providerId',model: 'providers' }]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: Budget});
});

//  delete Client
export const deleteBudgets= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findBudgets={
    _id: req.params.budgetsId
  }
  const c = await Budgets.updateOne(findBudgets,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Budgets and all the related data deleted successfully' });
});



export const updateBudgets= tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findBudgets={
    _id: req.params.budgetsId
  }
  const updatedBudgets = await Budgets.updateOne(findBudgets,updateData)
  let message = 'Budgets edited successfully'

  res.status(200).json({ success: true, message: message })
});


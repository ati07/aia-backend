import Bills from '../models/bills.js';
import tryCatch from './utils/tryCatch.js';
import Project from '../models/project.js';

// create Client
export const createBills= tryCatch(async (req, res) => {

  //Todo:  error handling

  let BillsPayload = req.body
  BillsPayload.addedBy = req.auth.user._id
  
  // let findData = {
  //   _id: req.body.projectId
  // }

  // let ProjectsData = await Project.find(findData).sort({ name: 1 });

  // let remainder = parseFloat(ProjectsData[0].remainder) - parseFloat(req.body.amount);

  // ProjectsData.remainder = remainder.toString(); // Assuming reminder is the same as budget, adjust as needed


  // const updatedProject = await Project.updateOne(findData,{ $set: { remainder: remainder.toString() } })

  // if (!updatedProject) {
  //   return res.status(400).json({ success: false, message: 'Failed to update project reminder' });
  // }

  const newBills= new Bills(BillsPayload);

  await newBills.save()
  res.status(200).json({ success: true, message: 'Bills added successfully' });

})

// create getClient
export const getBills= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.projectId) {
    findData['projectId'] = req.query.projectId
  }

  // if (req.query.date) {
  //   const start = new Date(req.query.date);
  //   const end = new Date(req.query.date);
  //   end.setDate(end.getDate() + 1);

  //   findData['date'] = { $gte: start, $lt: end };
  // }
  if (req.query.from) {
    const from = new Date(req.query.from);
    const end = new Date(req.query.from);
    end.setDate(end.getDate() + 1);
    let dateFilter = { $gte: from, $lte: end };
    if (req.query.to && req.query.to.trim() !== "") {
      const to = new Date(req.query.to);
      dateFilter.$lte = to;
    }
    findData['date'] = dateFilter;
  }

  const Bill = await Bills.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path:'projectId',model: 'projects' },
    { path:'paidFromId',model: 'paidfroms' },
    { path:'statusId',model: 'status' },
    { path:'providerId',model: 'providers' }]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: Bill});
});

//  delete Client
export const deleteBills= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findBills={
    _id: req.params.billsId
  }
  const c = await Bills.updateOne(findBills,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Bills and all the related data deleted successfully' });
});



export const updateBills= tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findBills={
    _id: req.params.billsId
  }
  const updatedBills = await Bills.updateOne(findBills,updateData)
  let message = 'Bills edited successfully'

  res.status(200).json({ success: true, message: message })
});


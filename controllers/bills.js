import Bills from '../models/bills.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createBills= tryCatch(async (req, res) => {

  //Todo:  error handling

  let BillsPayload = req.body
  BillsPayload.addedBy = req.auth.user._id
  
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

  if (req.query.date) {
    const start = new Date(req.query.date);
    const end = new Date(req.query.date);
    end.setDate(end.getDate() + 1);

    findData['date'] = { $gte: start, $lt: end };
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


import PaidFrom from '../models/paidFrom.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createPaidFrom= tryCatch(async (req, res) => {

  //Todo:  error handling

  let PaidFromPayload = req.body
  PaidFromPayload.addedBy = req.auth.user._id
  
  const newPaidFrom= new PaidFrom(PaidFromPayload);

  await newPaidFrom.save()
  res.status(200).json({ success: true, message: 'PaidFrom added successfully' });

})

// create getClient
export const getPaidFrom= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const PaidFroms = await PaidFrom.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: PaidFroms});
});

//  delete Client
export const deletePaidFrom= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findPaidFrom={
    _id: req.params.paidFromId
  }
  const c = await PaidFrom.updateOne(findPaidFrom,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'PaidFrom and all the related data deleted successfully' });
});



export const updatePaidFrom = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findPaidFrom={
    _id: req.params.paidFromId
  }
  const updatedPaidFrom = await PaidFrom.updateOne(findPaidFrom,updateData)
  let message = 'PaidFrom edited successfully'

  res.status(200).json({ success: true, message: message })
});


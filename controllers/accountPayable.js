import AccountPayable from '../models/accountsPayable.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createAccountPayable= tryCatch(async (req, res) => {

  //Todo:  error handling

  let AccountPayablePayload = req.body
  AccountPayablePayload.addedBy = req.auth.user._id
  
  const newAccountPayable= new AccountPayable(AccountPayablePayload);

  await newAccountPayable.save()
  res.status(200).json({ success: true, message: 'AccountPayable added successfully' });

})

// create getClient
export const getAccountPayable= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.providerId) {
    findData['providerId'] = req.query.providerId
  }

  if (req.query.date) {
    const start = new Date(req.query.date);
    const end = new Date(req.query.date);
    end.setDate(end.getDate() + 1);

    findData['date'] = { $gte: start, $lt: end };
  }

  const AccountPayables = await AccountPayable.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path:'projectId',model: 'projects' },
    // { path: 'userId', model: 'users' },
    { path:'providerId',model: 'providers' }]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: AccountPayables});
});

//  delete Client
export const deleteAccountPayable= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findAccountPayable={
    _id: req.params.accountPayableId
  }
  const c = await AccountPayable.updateOne(findAccountPayable,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'AccountPayable and all the related data deleted successfully' });
});



export const updateAccountPayable= tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findAccountPayable={
    _id: req.params.accountPayableId
  }
  const updatedAccountPayable = await AccountPayable.updateOne(findAccountPayable,updateData)
  let message = 'AccountPayable edited successfully'

  res.status(200).json({ success: true, message: message })
});


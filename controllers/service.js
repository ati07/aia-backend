import Service from '../models/service.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createService= tryCatch(async (req, res) => {

  //Todo:  error handling

  let ServicePayload = req.body
  ServicePayload.addedBy = req.auth.user._id
  
  const newService= new Service(ServicePayload);

  await newService.save()
  res.status(200).json({ success: true, message: 'Service added successfully' });

})

// create getClient
export const getService= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const Services = await Service.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: Services});
});

//  delete Client
export const deleteService= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findService={
    _id: req.params.serviceId
  }
  const c = await Service.updateOne(findService,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Service and all the related data deleted successfully' });
});



export const updateService = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findService={
    _id: req.params.serviceId
  }
  const updatedService = await Service.updateOne(findService,updateData)
  let message = 'Service edited successfully'

  res.status(200).json({ success: true, message: message })
});


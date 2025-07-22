import mongoose from 'mongoose';


const billSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    date: { type: Date },
    projectId: { type: mongoose.Schema.Types.ObjectId},
    providerId: { type: mongoose.Schema.Types.ObjectId},
    paidFromId: { type: mongoose.Schema.Types.ObjectId }, // change to ObjectId if referencing another model
    amount: { type: String },
    statusId: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},{ timestamps: true });

const bill = mongoose.model('bills', billSchema);
export default bill;


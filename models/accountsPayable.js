import mongoose from 'mongoose';


const AccountPayableSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    date: { type: Date},
    providerId: { type: mongoose.Schema.Types.ObjectId },
    amount: { type: Number},
    dateOfService: { type: Date },
    paymentDate: { type: Date },
    status: { type: String },
    comments: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},{ timestamps: true });

const AccountPayable = mongoose.model('AccountPayable', AccountPayableSchema);
export default AccountPayable;


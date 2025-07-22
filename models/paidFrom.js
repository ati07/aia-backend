// models/Log.js
import mongoose from 'mongoose';

const PaidFromSchema = new mongoose.Schema({
  addedBy: { type: mongoose.Types.ObjectId },
  name: { type: String },
  isDelete:{ type: Boolean, default: false },
  isActive:{ type: Boolean, default: true }, 
},{ timestamps: true });

let PaidFrom = mongoose.model('paidfroms', PaidFromSchema);
export default PaidFrom
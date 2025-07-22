// models/Log.js
import mongoose from 'mongoose';

const StatusSchema = new mongoose.Schema({
  addedBy: { type: mongoose.Types.ObjectId },
  name: { type: String },
  isDelete:{ type: Boolean, default: false },
  isActive:{ type: Boolean, default: true }, 
},{ timestamps: true });

let Status = mongoose.model('status', StatusSchema);
export default Status
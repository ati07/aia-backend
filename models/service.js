// models/Log.js
import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  addedBy: { type: mongoose.Types.ObjectId },
  name: { type: String },
  isDelete:{ type: Boolean, default: false },
  isActive:{ type: Boolean, default: true }, 
},{ timestamps: true });

let Service = mongoose.model('service', ServiceSchema);
export default Service
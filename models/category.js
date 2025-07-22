// models/Log.js
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  addedBy: { type: mongoose.Types.ObjectId },
  name: { type: String },
  isDelete:{ type: Boolean, default: false },
  isActive:{ type: Boolean, default: true }, 
  timestamp: { type: Date, default: Date.now },
},{ timestamps: true });

let Category = mongoose.model('category', CategorySchema);
export default Category
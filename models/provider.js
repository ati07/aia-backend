import mongoose from 'mongoose';

const providerSchema = mongoose.Schema(
  {
    name: { type: String },
    addedBy: { type: mongoose.Types.ObjectId },
    phoneNumber: { type: String },
    email: { type: String },
    contact: { type: String },
    description: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
  },
  { timestamps: true }
);

const Provider = mongoose.model('providers', providerSchema);
export default Provider;

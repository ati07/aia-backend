import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    startDate: { type: Date },
    estimatedCompletion: { type: Date },
    budget: { type: String },
    remainder: { type: String },
    description: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},
{ timestamps: true }
);

const Project = mongoose.model('projects', projectSchema);
export default Project;


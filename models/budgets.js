import mongoose from 'mongoose';


const BudgetsSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    categoryId: { type: String }, // or ObjectId + ref if you're referencing
    providerId: { type: mongoose.Schema.Types.ObjectId },
    serviceId: { type: mongoose.Schema.Types.ObjectId}, // change to ObjectId + ref if needed
    unitValue: { type: String },
    amount: { type: String },
    totalValue: { type: String }, // can be calculated via middleware
    itbms: { type: String },      // also calculated
    transport: { type: String},
    eventual: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String},
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},{ timestamps: true });

const Budgets = mongoose.model('budgets', BudgetsSchema);
export default Budgets;


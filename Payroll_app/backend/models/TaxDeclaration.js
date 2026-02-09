const mongoose = require('mongoose');

const TaxItemSchema = new mongoose.Schema({
    amount: { type: Number, default: 0 },
    proofUrl: { type: String, default: null },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    remarks: String
});

const TaxDeclarationSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    financialYear: { type: String, required: true },
    regime: { type: String, enum: ['Old', 'New'], default: 'New' },
    declarations: {
        section80C: TaxItemSchema,
        section80D: TaxItemSchema,
        hra: TaxItemSchema,
        other: TaxItemSchema
    }
}, { timestamps: true });

module.exports = mongoose.model('TaxDeclaration', TaxDeclarationSchema);
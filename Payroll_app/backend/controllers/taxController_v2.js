const TaxDeclaration = require('../models/TaxDeclaration');
const { calculateTax } = require('../utils/taxEngine');

exports.getTaxSummary = async (req, res) => {
    try {
        const { empId } = req.params;
        // Mocking salary from Module 4 dependency
        const annualGross = 1200000; 
        
        let declaration = await TaxDeclaration.findOne({ employeeId: empId });
        if (!declaration) {
            declaration = await TaxDeclaration.create({ employeeId: empId, financialYear: "2025-26" });
        }

        const projection = calculateTax(annualGross, declaration.declarations, declaration.regime);
        res.status(200).json({ annualGross, declaration, projection });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.submitDeclaration = async (req, res) => {
    try {
        const { empId, section, amount, regime } = req.body;
        const updateData = { regime };
        
        if (section) {
            updateData[`declarations.${section}.amount`] = amount;
            if (req.file) updateData[`declarations.${section}.proofUrl`] = req.file.path;
            updateData[`declarations.${section}.status`] = 'Pending';
        }

        const updated = await TaxDeclaration.findOneAndUpdate(
            { employeeId: empId },
            { $set: updateData },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
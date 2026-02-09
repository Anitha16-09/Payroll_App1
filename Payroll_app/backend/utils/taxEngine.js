/**
 * taxEngine.js - Standardized Tax Calculation Logic
 */
const calculateTax = (annualGross, declarations = {}, regime = 'New') => {
    const standardDeduction = 75000;
    let taxableIncome = annualGross - standardDeduction;

    if (regime === 'Old') {
        const d = declarations;
        const totalDeductions = 
            Math.min(d.section80C?.amount || 0, 150000) + 
            Math.min(d.section80D?.amount || 0, 25000) + 
            (d.hra?.amount || 0);
        taxableIncome -= totalDeductions;
    }

    let tax = 0;
    if (regime === 'New') {
        // 2025-26 Budget Slabs
        if (taxableIncome <= 1200000) return { taxableIncome, annualTax: 0, monthlyTDS: 0 };
        if (taxableIncome > 1500000) tax = (taxableIncome - 1500000) * 0.3 + 150000;
        else if (taxableIncome > 1200000) tax = (taxableIncome - 1200000) * 0.2 + 90000;
    } else {
        // Old Regime Slabs
        if (taxableIncome > 1000000) tax = (taxableIncome - 1000000) * 0.3 + 112500;
        else if (taxableIncome > 500000) tax = (taxableIncome - 500000) * 0.2 + 12500;
    }

    const totalTax = Math.round(tax * 1.04); // 4% Cess
    return {
        taxableIncome: Math.max(0, taxableIncome),
        annualTax: totalTax,
        monthlyTDS: Math.round(totalTax / 12)
    };
};

module.exports = { calculateTax };
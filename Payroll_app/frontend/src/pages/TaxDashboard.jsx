import React, { useEffect, useState } from 'react';
import { fetchTaxSummary, updateTaxData } from '../services/taxApi';
import TaxCard from '../components/TaxCard';

const TaxDashboard = () => {
    const [data, setData] = useState(null);
    const empId = "YOUR_EMP_ID_FROM_AUTH"; // Replace with real Auth ID

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await fetchTaxSummary(empId);
        setData(res.data);
    };

    const handleUpload = async (section, amount, file) => {
        const formData = new FormData();
        formData.append('empId', empId);
        formData.append('section', section);
        formData.append('amount', amount);
        if (file) formData.append('proof', file);
        
        await updateTaxData(formData);
        loadData();
    };

    if (!data) return <div className="p-10">Loading Financials...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Tax Management</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TaxCard title="Annual Gross" amount={data.annualGross} color="border-blue-500" />
                <TaxCard title="Taxable Income" amount={data.projection.taxableIncome} color="border-green-500" />
                <TaxCard title="Estimated Monthly TDS" amount={data.projection.monthlyTDS} color="border-purple-500" />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Investments (Old Regime)</h2>
                {['section80C', 'section80D'].map(sec => (
                    <div key={sec} className="flex items-center justify-between p-4 border-b">
                        <span className="uppercase font-medium text-gray-600">{sec}</span>
                        <input 
                            type="file" 
                            onChange={(e) => handleUpload(sec, 150000, e.target.files[0])}
                            className="text-sm"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaxDashboard;
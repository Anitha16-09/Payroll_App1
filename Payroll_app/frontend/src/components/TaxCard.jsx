import React from 'react';

const TaxCard = ({ title, amount, icon, color }) => (
    <div className={`p-6 rounded-2xl bg-white shadow-sm border-t-4 ${color}`}>
        <div className="text-gray-500 text-sm font-medium">{title}</div>
        <div className="text-2xl font-bold mt-2">₹{amount.toLocaleString()}</div>
    </div>
);

export default TaxCard;
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/tax' });

export const fetchTaxSummary = (empId) => API.get(`/summary/${empId}`);
export const updateTaxData = (formData) => API.post('/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
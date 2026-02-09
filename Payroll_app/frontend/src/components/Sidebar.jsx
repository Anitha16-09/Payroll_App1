import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Payroll System</h2>
      <nav className="space-y-2">
        <Link 
          to="/dashboard/tax-management" 
          className={`block p-3 rounded transition ${
            location.pathname.includes('tax-management') ? 'bg-blue-600' : 'hover:bg-gray-700'
          }`}
        >
          Tax Management
        </Link>
        {/* Other links... */}
      </nav>
    </div>
  );
};
import { Outlet, Link } from 'react-router-dom';

const EmployeeLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* A Different Navigation Style: Top Bar instead of Sidebar */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold text-blue-600">Employee Portal</h2>
        <div className="flex gap-6">
  {/* Match this to your App.jsx path */}
  <Link to="/ess/tax-management" className="text-gray-600 hover:text-blue-600">
    Tax Center
  </Link>
  
  <Link to="/ess/profile" className="text-gray-600 hover:text-blue-600">
    My Profile
  </Link>
</div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        {/* The window for child components */}
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ========== LAYOUTS ==========
import DashboardLayout from "./layouts/DashboardLayout";
import EmployeeLayout from './layouts/EmployeeLayout';

// ========== PAGES ==========
import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import VerifyOrgPage from "./pages/VerifyOrgPage";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import AddEmployee from "./pages/AddEmployee";
import Payroll from "./pages/Payroll";
import RunPayroll from "./pages/RunPayroll";
import TaxSlab from "./pages/TaxSlab";
import StatutoryConfig from "./pages/StatutoryConfig";
import PayrollProfileForm from "./pages/PayrollProfileForm";
import PayrollProfileList from "./pages/PayrollProfileList";
import PayrollProfileView from "./pages/PayrollProfileView";
import PayrollProfileEdit from "./pages/PayrollProfileEdit";
import SalaryTemplateList from "./pages/salary/SalaryTemplateList";
import SalaryTemplateForm from "./pages/salary/SalaryTemplateForm";
import SalaryTemplateEdit from "./pages/SalaryTemplateEdit";
import SalaryPreview from "./pages/salary/SalaryPreview";
import AssignTemplate from "./pages/salary/AssignTemplate";
import Attendance from "./pages/Attendance";
import PayrollPreview from "./pages/PayrollPreview";
import PayrollApproval from "./pages/PayrollApproval";
import PayrollHistory from "./pages/PayrollHistory";
import TaxDashboard from './pages/TaxDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />

        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register-org" element={<RegisterOrg />} />
          <Route path="/verify-org/:status" element={<VerifyOrgPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ================= ADMIN ROUTES (DashboardLayout) ================= */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/run-payroll" element={<RunPayroll />} />
            <Route path="/tax-slab" element={<TaxSlab />} />
            <Route path="/statutory" element={<StatutoryConfig />} />
            <Route path="/payroll-profile/create" element={<PayrollProfileForm />} />
            <Route path="/payroll-profiles" element={<PayrollProfileList />} />
            <Route path="/payroll-profile/:employeeCode" element={<PayrollProfileView />} />
            <Route path="/payroll-profile/edit/:employeeCode" element={<PayrollProfileEdit />} />
            <Route path="/salary-template" element={<SalaryTemplateList />} />
            <Route path="/salary-template/new" element={<SalaryTemplateForm />} />
            <Route path="/salary-template/edit/:id" element={<SalaryTemplateEdit />} />
            <Route path="/salary-preview/:id" element={<SalaryPreview />} />
            <Route path="/assign-template/:id" element={<AssignTemplate />} />
            <Route path="/attendance/:employeeCode" element={<Attendance />} />
            <Route path="/payroll-preview" element={<PayrollPreview />} />
            <Route path="/payroll-approve" element={<PayrollApproval />} />
            <Route path="/payroll-history" element={<PayrollHistory />} />
          </Route>

          {/* ================= EMPLOYEE ROUTES (EmployeeLayout) ================= */}
          <Route
            element={
              <ProtectedRoute>
                <EmployeeLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/ess/tax-management" element={<TaxDashboard />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

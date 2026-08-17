import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

// Employee
import Employee from "./pages/employees/Employee";
import EmployeeForm from "./pages/employees/EmployeeForm";

// Department
import Department from "./pages/departments/Department";
import DepartmentForm from "./pages/departments/DepartmentForm";

// Position
import Position from "./pages/positions/Position";
import PositionForm from "./pages/positions/PositionForm";

// Attendance
import Attendance from "./pages/attendance/Attendance";
import AttendanceForm from "./pages/attendance/AttendanceForm";

// Leave
import Leave from "./pages/leave/Leave";
import LeaveForm from "./pages/leave/LeaveForm";

// Payroll
import Payroll from "./pages/payroll/Payroll";
import PayrollForm from "./pages/payroll/PayrollForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Employee */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/create"
          element={
            <ProtectedRoute>
              <EmployeeForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute>
              <EmployeeForm />
            </ProtectedRoute>
          }
        />

        {/* Department */}
        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Department />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments/create"
          element={
            <ProtectedRoute>
              <DepartmentForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments/edit/:id"
          element={
            <ProtectedRoute>
              <DepartmentForm />
            </ProtectedRoute>
          }
        />

        {/* Position */}
        <Route
          path="/positions"
          element={
            <ProtectedRoute>
              <Position />
            </ProtectedRoute>
          }
        />

        <Route
          path="/positions/create"
          element={
            <ProtectedRoute>
              <PositionForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/positions/edit/:id"
          element={
            <ProtectedRoute>
              <PositionForm />
            </ProtectedRoute>
          }
        />

        {/* Attendance */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/create"
          element={
            <ProtectedRoute>
              <AttendanceForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/edit/:id"
          element={
            <ProtectedRoute>
              <AttendanceForm />
            </ProtectedRoute>
          }
        />

        {/* Leave */}
        <Route
          path="/leave"
          element={
            <ProtectedRoute>
              <Leave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave/create"
          element={
            <ProtectedRoute>
              <LeaveForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave/edit/:id"
          element={
            <ProtectedRoute>
              <LeaveForm />
            </ProtectedRoute>
          }
        />

        {/* Payroll */}
        <Route
          path="/payroll"
          element={
            <ProtectedRoute>
              <Payroll />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll/create"
          element={
            <ProtectedRoute>
              <PayrollForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll/edit/:id"
          element={
            <ProtectedRoute>
              <PayrollForm />
            </ProtectedRoute>
          }
        />

        {/* Redirect */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
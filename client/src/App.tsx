import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeProvider";
import { useAppSelector } from "./hooks/reduxSelector";
import { RootState } from "./Redux/Store/store";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { ProtectedLayout } from "./Layout/ProtectedLayout";
import { AuthLayout } from "./Layout/AuthLayout";
import { Error404 } from "./pages/NotFound/Error404";
import Unauthorized from "./pages/Auth/Unauthorized";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import PermissionsPage from "./pages/UserManagement/Permissions";
import RootLayout from "./Layout/RootLayout";
import AuditLogs from "./pages/UserManagement/AuditLogs";
import AccountSetting from "./components/Profile/AccountSetting";
import SecurityLogs from "./pages/SecurityAndBackup/SecurityLogs";
import DataBackups from "./pages/SecurityAndBackup/DataBackups";
import SecuritySettings from "./pages/SecurityAndBackup/SecuritySettings";
import Dashboard from "./pages/Dashboard/Dashbord";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminJobsPage from "./pages/jobs/AdminJobsPage";

function App() {
const { isAuthenticated, user, checking } = useAppSelector((state: RootState) => state?.auth);

  useAuthCheck();

    if (checking) {
    return <div>Loading...</div>; 
      }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Navigate to={isAuthenticated ? `/${user?.role}` : "/auth/signin"} replace /> }
      ],
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        { path: "signin", element: <Signin /> },
        { path: "signup", element: <Signup /> },
        { path: "forgot", element: <ForgotPassword /> },
        { path: "reset_password/:id/:token", element: <ResetPassword />},

      ],
    },

    { path: "unauthorized", element: <Unauthorized /> },
    {
      path: "superadmin",
      element: <ProtectedLayout allowedRoles={["superadmin"]} />,
      errorElement: <Error404 />,
      children: [
        // dashboard
        { path: "dashboard", element: <Dashboard /> },
        //job
        { path: "jobs", element: <AdminJobsPage /> },

        // user-management
        { path: "permissions", element: <PermissionsPage /> },
        { path: "audit-logs", element: <AuditLogs /> },

        // profile
        { path: "account-settings", element: <AccountSetting /> },

        //security and databackup
        { path: "security/logs", element: <SecurityLogs /> },
        { path: "security/backups", element: <DataBackups /> },
        { path: "security/settings", element: <SecuritySettings /> },
      ],
    },

    // Catch-all route
    { path: "*", element: <Error404 /> },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
export default App;

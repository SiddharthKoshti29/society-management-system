

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ManageResidents from "./pages/ManageResidents";
import ManageComplaints from "./pages/ManageComplaints";
import VisitorLogs from "./pages/VisitorLogs";
import MyQRCode from "./pages/MyQRCode";
import VisitorEntry from "./pages/VisitorEntry";
import MaintenancePayment from "./pages/MaintenancePayment";
import MaintenanceHistory from "./pages/MaintenanceHistory";
import AdminVisitors from "./pages/AdminVisitors";
import SubmitComplaints from "./pages/SubmitComplaints";
import LandingPage from "./pages/LandingPage";
import AdminMaintenanceDashboard from "./pages/AdminMaintenanceDashboard";

import MyComplaint from "./pages/MyComplaint";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
       <Route path="/" element={<LandingPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/my-complaints"
  element={
    <PrivateRoute>
      <SubmitComplaints/>
    </PrivateRoute>
  }
/>
 <Route path="/admin-visitor" element={<AdminVisitors />} />
<Route
  path="/admin-visitors"
  element={
    <PrivateRoute>
      <AdminVisitors />
    </PrivateRoute>
  }
/>

<Route path="/maintenance/pay" element={<MaintenancePayment />} />
<Route path="/maintenance/history" element={<MaintenanceHistory />} />



       <Route
  path="/admin/residents"
  element={
    <PrivateRoute>
      <ManageResidents />
    </PrivateRoute>
  }
/>


<Route
  path="/maintenance/pay"
  element={
    <PrivateRoute>
      <MaintenancePayment />
    </PrivateRoute>
  }
/>
<Route
  path="/maintenance/history"
  element={
    <PrivateRoute>
      <MaintenanceHistory />
    </PrivateRoute>
  }
/>

<Route
  path="/admin/complaints"
  element={
    <PrivateRoute>
      <ManageComplaints />
    </PrivateRoute>
  }
/>

<Route path="/visitor-entry" element={<VisitorEntry />} />

<Route
  path="/admin/visitors"
  element={
    <PrivateRoute>
      <VisitorLogs />
    </PrivateRoute>
  }
/>


<Route
  path="/complaints/my"
  element={
    <PrivateRoute>
      <SubmitComplaints />
    </PrivateRoute>
  }
/>
<Route
  path="/visitor-history"
  element={
    <PrivateRoute>
      <VisitorLogs />
    </PrivateRoute>
  }
/>
<Route
  path="/visitors/generate"
  element={
    <PrivateRoute>
      <MyQRCode />
    </PrivateRoute>
  }
/>
<Route
  path="/admin/maintenance"
  element={
    <PrivateRoute>
      <AdminMaintenanceDashboard />
    </PrivateRoute>
  }
/>

<Route path="/my-complaint" element={<MyComplaint />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}



export default App;

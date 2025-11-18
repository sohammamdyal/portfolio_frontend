import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
const Home = lazy(() => import('./pages/Home'));
const AdminLogin = lazy(() => import('./Admin/pages/AdminLogin'));
const AdminSignup = lazy(() => import('./Admin/pages/AdminSignup'));
// const AdminLayout = lazy(() => import('./Admin/layouts/DashboardLayout'));
// const AdminMessages = lazy(() => import('./components/AdminMessages'));
// const AdminProjects = lazy(() => import('./components/AdminProjects'));
// const AddProject = lazy(() => import('./components/AddProject'));
// const EditProject = lazy(() => import('./components/EditProject'));
import ProtectedRoute from "./components/ProtectedRoute"
import './App.css';
import Hero from "./components/Hero";
import Loading from "./components/Loading";
import Dashboard from "./Admin/pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adminregister" element={<AdminSignup/>} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}




export default App;

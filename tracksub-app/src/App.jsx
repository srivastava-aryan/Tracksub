import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddSubscription from "./pages/AddSubscription";
import Tags from "./pages/Tags";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Reminders from "./pages/Reminders.jsx";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={!user ? <Navigate to="/login" /> : <Dashboard />} />
        <Route path="/add" element={<AddSubscription />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reminders" element={<Reminders />} /> 
        <Route path="*" element={<h1 className="p-6 text-red-500">404: Page not found</h1>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
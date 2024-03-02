import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import BetaPage from "./pages/Beta";
import PickLocationPage from "./pages/PickLocation";
import DashboardPage from "./pages/Dashboard";
import AdminDashboardPage from "./pages/AdminDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={BetaPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/picklocation" Component={PickLocationPage} />
        <Route path="/dashboard" Component={DashboardPage} />
        <Route path="/admindashboard" Component={AdminDashboardPage} />
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./screens/Home";
import Login from "./componentss/Login";
import Usersignup from "./componentss/User_Signup/Usersignup";
import Emailverify from "./componentss/Email_Verify/Emailverify";
import BusinessSignup from "./componentss/Business_Signup/BusinessSignup";
import Profile from "./componentss/Business_Dashboard/Profile";
import DashboardOptions from "./componentss/Business_Dashboard/DashboardOptions";
import ProtectedRoute from "./componentss/ProtectedRoutes/ProtectedRoutes";
import Time from "./componentss/Business_Dashboard/Time";
import DesktopBigCard from "./componentss/User_View/DesktopBigCard";
import FullLibraryDetails from "./screens/FullLibraryDetails";
import NearMeCard from "./componentss/libraryDetail/NearMeCard";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userSignup" element={<Usersignup />} />
        <Route path="/emailverify" element={<Emailverify />} />
        <Route path="/businessSignup" element={<BusinessSignup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/time" element={<Time />} />
        <Route path="/nearme" element={<DesktopBigCard />} />
        <Route path="/libraryDetails" element={<FullLibraryDetails />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="business">
              <DashboardOptions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

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
import PostForm from "./css/Post/PostForm";
import PostList from "./css/Post/PostList";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/userSignup" element={<Usersignup />} />
        <Route path="auth/emailVerify" element={<Emailverify />} />
        <Route path="auth/businessSignup" element={<BusinessSignup />} />
        <Route path="dashboard/:view" element={<DashboardOptions/>} />
        <Route path="/time" element={<Time />} />
        <Route path="/nearme" element={<DesktopBigCard />} />
        <Route path="/post" element={<PostForm/>} />
        <Route path="/postlist" element={<PostList/>} />
        <Route path="/libraryDetails/:id" element={<FullLibraryDetails />} />
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

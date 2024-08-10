import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./Pages/PageNotFound";
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import DashboardProfile from "./Components/DashboardProfile";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute";
import CreateTourPackages from "./Pages/CreateTourPackages";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
      </div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>//privat routing
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>//privat routing
        <Route path="/create-tours" element={<CreateTourPackages />} />
        </Route>
        {/* <Route path="/dashboard" element={< Dashboard />} /> */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        {/* <Route path="/dashboard?tab=profile" element={<DashboardProfile />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

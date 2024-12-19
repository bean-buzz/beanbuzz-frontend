import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "../styles/App.css";
import HomePage from "../pages/HomePage.jsx";
import OurMenuPage from "../pages/OurMenuPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import UserAuthenticationPage from "../pages/UserAuthenticationPage.jsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.jsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";

// Import Layouts
import ProtectedLayout from "../components/ProtectedLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Footer from "./Footer.jsx";

//Import Dashboard
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";

// Import admin-specific components
import MenuItems from "../pages/MenuItems.jsx";
import Orders from "../pages/Orders.jsx";
import Payments from "../pages/Payments.jsx";
import Reviews from "../pages/Reviews.jsx";

// Import User-specific components
import MyProfile from "../pages/MyProfile.jsx";
import UserReview from "../pages/UserReview.jsx";
import UserOrder from "../pages/UserOrder.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<OurMenuPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<UserAuthenticationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />

            {/* User-specific Routes */}
            <Route path="/user/profile" element={<MyProfile />} />
            <Route path="/user/review" element={<UserReview />} />
            <Route path="/user/orders" element={<UserOrder />} />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            {/* For Admin & Staff */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/items" element={<MenuItems />} />
              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/dashboard/payments" element={<Payments />} />
              <Route path="/dashboard/reviews" element={<Reviews />} />
            </Route>
          </Route>
        </Routes>

        {/* This is our custom footer! */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

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
import PublicLayout from "./layouts/PublicLayout.jsx";
import ProtectedLayout from "../components/ProtectedLayout.jsx";

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
import UserProfile from "../pages/UserProfile.jsx";
import MyProfile from "../pages/MyProfile.jsx";
import UserReview from "../pages/UserReview.jsx";
import UserOrder from "../pages/UserOrder.jsx";
import UserLoyaltyReward from "../pages/UserLoyaltyRewards.jsx";

import ApprovedReviews from "../components/ApprovedReviews.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/menu"
            element={
              <PublicLayout>
                <OurMenuPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ApprovedReviews />
              </PublicLayout>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/items" element={<MenuItems />} />
              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/dashboard/payments" element={<Payments />} />
              <Route path="/dashboard/reviews" element={<Reviews />} />
            </Route>
          </Route>

          <Route
            path="/auth"
            element={
              <PublicLayout>
                <UserAuthenticationPage />
              </PublicLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicLayout>
                <ForgotPasswordPage />
              </PublicLayout>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <PublicLayout>
                <ResetPasswordPage />
              </PublicLayout>
            }
          />

          {/* User-specific Routes */}
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/profile" element={<MyProfile />} />
          <Route path="/user/review" element={<UserReview />} />
          <Route path="/user/orders" element={<UserOrder />} />
          <Route path="/user/loyalty" element={<UserLoyaltyReward />} />
        </Routes>

        {/* This is our custom footer! */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

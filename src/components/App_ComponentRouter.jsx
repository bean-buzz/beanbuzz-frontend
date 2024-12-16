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
import AdminLayout from "./layouts/AdminLayout.jsx";
import StaffLayout from "./layouts/StaffLayout.jsx";

import Footer from "./Footer.jsx";

// Import admin-specific components
import AdminDashboard from "../pages/AdminDashboard.jsx";
import MenuItems from "../pages/MenuItems.jsx";
import Orders from "../pages/Orders.jsx";
import Payments from "../pages/Payments.jsx";
import Reviews from "../pages/Reviews.jsx";

// Import kitchen-staff-specific components
import StaffDashboard from "../pages/StaffDashboard.jsx";

// Import User-specific components
import UserProfile from "../pages/UserProfile.jsx";
import MyProfile from "../pages/MyProfile.jsx";
import UserReview from "../pages/UserReview.jsx";
import UserOrder from "../pages/UserOrder.jsx";
import UserLoyaltyReward from "../pages/UserLoyaltyRewards.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
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
                  <ContactPage />
                </PublicLayout>
              }
            />
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

          {/* Admin-specific Routes */}
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/items"
            element={
              <AdminLayout>
                <MenuItems />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminLayout>
                <Orders />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <AdminLayout>
                <Payments />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <AdminLayout>
                <Reviews />
              </AdminLayout>
            }
          />

          {/* Kitchen-Staff-specific Routes */}
          <Route
            path="/staff"
            element={
              <StaffLayout>
                <StaffDashboard />
              </StaffLayout>
            }
          />
          <Route
            path="/staff/orders"
            element={
              <StaffLayout>
                <Orders />
              </StaffLayout>
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

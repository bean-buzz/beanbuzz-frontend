import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "../styles/App.css";
import HomePage from "../pages/HomePage.jsx";
import OurMenuPage from "../pages/OurMenuPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import UserAuthenticationPage from "../pages/UserAuthenticationPage.jsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.jsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.jsx";

import PublicLayout from "./layouts/PublicLayout.jsx";
import ProtectedLayout from "../components/ProtectedLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

import Footer from "./Footer.jsx";

// Import admin-specific components
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import MenuItems from "../pages/MenuItems.jsx";
import Orders from "../pages/Orders.jsx";
import Payments from "../pages/Payments.jsx";
import Reviews from "../pages/Reviews.jsx";
import UserProfile from "../pages/UserProfile.jsx";

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

          {/* Admin Routes */}
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

          <Route
            path="/user"
            element={
              <PublicLayout>
                <UserProfile />
              </PublicLayout>
            }
          />
        </Routes>

        {/* This is our custom footer! */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

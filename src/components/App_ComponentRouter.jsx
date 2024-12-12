import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "../styles/App.css";
import HomePage from "../pages/HomePage.jsx";
import OurMenuPage from "../pages/OurMenuPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import UserAuthenticationPage from "../pages/UserAuthenticationPage.jsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.jsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.jsx";

import ProtectedLayout from "../components/ProtectedLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* This is our custom navbar! */}
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<OurMenuPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* All routes within here are protected by a jwt check */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/auth" element={<UserAuthenticationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<OurMenuPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        {/* This is our custom footer! */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

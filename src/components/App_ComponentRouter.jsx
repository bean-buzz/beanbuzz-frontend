import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "../styles/App.css";
import HomePage from "../pages/HomePage.jsx";
import OurMenuPage from "../pages/OurMenuPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
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
        </Routes>

        {/* This is our custom footer! */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

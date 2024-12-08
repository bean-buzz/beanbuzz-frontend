import { useState } from "react";

import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

import "../styles/UserAuthentication.css";

export default function UserAuthenticationPage() {
  // Boolean state to determine whether to show Login or Register
  const [isLogin, setIsLogin] = useState(true);

  // Toggle between Login and Register
  const toggleAuthMode = () => {
    setIsLogin((prevState) => !prevState); // Invert the current state
  };

  return (
    <div className="user-auth-container">
      <div className="test-container"></div>
      {/* <h1>{isLogin ? "Login" : "Register"}</h1> */}
      {/* Render the appropriate form based on isLogin */}
      {isLogin ? (
        <LoginForm toggleAuthMode={toggleAuthMode} />
      ) : (
        <RegisterForm toggleAuthMode={toggleAuthMode} />
      )}
    </div>
  );
}

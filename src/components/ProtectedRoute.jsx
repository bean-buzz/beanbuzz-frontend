import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwt");

  // Fetch protected data
  // Retrieve the JWT token from storage
  const fetchProtectedData = async () => {
    const token = localStorage.getItem("jwt");

    function getRoleFromToken(token) {
      if (!token) {
        throw new Error("Token is required");
      }

      try {
        // Decode the JWT token
        const decodedToken = jwtDecode(token);

        // Assuming the role is in a `role` field in the payload
        const role = decodedToken.role;

        // Return the role or null if not found
        return role || null;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }

    const userRole = getRoleFromToken(token);

    console.log("User Role:", userRole);

    if (!token) {
      setError("No token found. Please sign in.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/protectedRoute`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Protected data:", data.message);
        console.log(data);
      } else {
        setError("Token is invalid or expired. Please sign in again.");
        localStorage.removeItem("jwt");
        // Redirect to sign-in page
        navigate("/auth");
      }
    } catch (error) {
      setError("Error fetching protected data. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If token exists, try fetching protected data
    if (token) {
      fetchProtectedData();
    } else {
      // If no token, redirect to sign-in page
      setError("No token found. Please sign in.");
      navigate("/auth");
    }
  }, [token, navigate]);

  if (loading) {
    // Show loading state while checking or fetching data
    // TODO: create a loading animation
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // If everything is valid, render the children - protected content
  return children;
}

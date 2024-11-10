// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Email submitted:", email);

//     try {
//       const response = await fetch("http://localhost:8000/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       console.log("Response from server:", data);

//       if (data.status === "reset-link-sent") {
//         alert("Reset link sent! Check your email.");
//         navigate("/login"); // Navigate to the login page after success
//       } else if (data.status === "invalid-email") {
//         alert("Email not found. Please check and try again.");
//       } else {
//         alert("Failed to send reset link. Please try again later.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while sending the reset link.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Forgot Password</h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <button type="submit">Send Reset Link</button>
//     </form>
//   );
// };

// export default ForgotPassword;
// ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.status === "reset-link-sent") {
        setMessage("Reset link sent! Check your email.");
        setTimeout(() => navigate("/login"), 3000);
      } else if (data.status === "invalid-email") {
        setMessage("Email not found. Please check and try again.");
      } else {
        setMessage("Failed to send reset link. Please try again later.");
      }
    } catch (error) {
      setMessage("An error occurred while sending the reset link.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ForgotPassword;

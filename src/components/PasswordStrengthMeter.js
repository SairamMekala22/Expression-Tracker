import React from "react";
import './PasswordStrengthMeter.css';

function PasswordStrengthMeter({ password }) {
  // Define named requirements with labels and test functions
  const requirements = [
    { name: "Length", label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { name: "Uppercase", label: "Contains uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { name: "Lowercase", label: "Contains lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { name: "Number", label: "Contains number", test: (pwd) => /[0-9]/.test(pwd) },
    { name: "Special", label: "Contains special character", test: (pwd) => /[^A-Za-z0-9\s]/.test(pwd) }, // Excludes spaces
  ];

  // Check for spaces in the password
  const hasSpaces = /\s/.test(password);

  // Calculate the strength based on the requirements met
  const strength = requirements.reduce(
    (acc, req) => acc + (req.test(password) ? 1 : 0),
    0
  );
  const strengthLevels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["red", "orange", "yellow", "blue", "green"];
  const strengthPercent = (strength / requirements.length) * 100;

  return (
    <div className="password-strength-meter">
      {/* Display an error if spaces are detected */}
      {hasSpaces && (
        <div >
        <p style={{ color: "red", fontWeight: "bold"}}>
          Password should not contain spaces.
                         
        </p>
        <div id = "gap">
        </div>
        </div>
      )}
      {/* Strength bar */}
      <div
        className="strength-bar"
        style={{
          width: `${strengthPercent}%`,
          backgroundColor: strengthColor[strength - 1] || "gray",
        }}
      ></div>
      <p style={{ color: strengthColor[strength - 1] || "gray" }}>
        {strengthLevels[strength - 1] || "Very Weak"}
      </p>

      {/* Display each requirement and its status with a label */}
      <ul className="requirements">
        {requirements.map((req, index) => (
          <li
            key={index}
            style={{
              color: req.test(password) ? "green" : "#007bff",
              textDecoration: req.test(password) ? "line-through" : "none",
            }}
          >
            <strong>{req.name}:</strong> {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordStrengthMeter;

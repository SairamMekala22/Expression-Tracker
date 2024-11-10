// //app.js
// const express = require("express");
// const collection = require("./mongo"); // Ensure your MongoDB connection is set up
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // Configure nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'harshan.mateti@gmail.com', // Your Gmail address
//     pass: 'advo bcov nrbr asma', // Your app password or Gmail password
//   },
//   tls: {
//     rejectUnauthorized: false // Allow self-signed certificates (use cautiously)
//   }
// });

// // Endpoint for user login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await collection.findOne({ email: email });
//     if (!user) {
//       res.json({ status: "invalid" });
//     } else {
//       const isValid = await bcrypt.compare(password, user.password);
//       if (isValid) {
//         res.json({ status: "authenticated", user: user.email });
//       } else {
//         res.json({ status: "invalid" });
//       }
//     }
//   } catch (e) {
//     res.json({ status: "fail" });
//   }
// });

// // Endpoint for user signup
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const check = await collection.findOne({ email: email });
//     if (check) {
//       res.json({ status: "exist" });
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const data = {
//         email: email,
//         password: hashedPassword,
//         resetToken: null, 
//         resetTokenExpiry: null 
//       };
//       await collection.insertMany([data]);
//       res.json({ status: "created" });
//     }
//   } catch (e) {
//     res.json({ status: "fail" });
//   }
// });

// // Endpoint for forgotten password
// app.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await collection.findOne({ email: email });
//     if (!user) {
//       return res.json({ status: "invalid-email" });
//     }

//     // Generate a reset token
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

//     // Update user with reset token and expiry
//     await collection.updateOne(
//       { email: email },
//       { $set: { resetToken, resetTokenExpiry } }
//     );

//     // Send email with reset link (replace with your frontend URL)
//     const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
//     const mailOptions = {
//       to: email,
//       subject: 'Password Reset',
//       text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ status: "reset-link-sent" });
//   } catch (e) {
//     res.json({ status: "fail" });
//   }
// });

// // Endpoint for resetting password
// app.post("/reset-password/:token", async (req, res) => {
//   const { token } = req.params; // Get the token from the URL
//   const { newPassword } = req.body; // Get the new password from the request body

//   try {
//     // Query the user by resetToken and ensure resetTokenExpiry has not passed
//     const user = await collection.findOne({
//       resetToken: token,
//       resetTokenExpiry: { $gt: Date.now() } // Token must not be expired
//     });

//     if (!user) {
//       return res.json({ status: "invalid-token" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user's password and reset the token fields
//     const updateResult = await collection.updateOne(
//       { email: user.email },
//       {
//         $set: {
//           password: hashedPassword,
//           resetToken: null,
//           resetTokenExpiry: null
//         }
//       }
//     );

//     if (updateResult.modifiedCount === 1) {
//       res.json({ status: "password-reset-success" });
//     } else {
//       res.json({ status: "fail", message: "Password reset failed. Please try again." });
//     }
//   } catch (e) {
//     res.json({ status: "fail" });
//   }
// });

// // Start the server
// app.listen(8000, (err) => {
//   if (err) {
//     console.error("Error starting server:", err);
//   } else {
//     console.log("Server is running on port 8000");
//   }
// });
// //app.js
// import express from "express";
// import collection from "./mongo.js"; // Ensure your MongoDB connection is set up
// import cors from "cors";
// import bcrypt from "bcrypt";
// import crypto from "crypto";
// import nodemailer from "nodemailer";

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // Configure nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'harshan.mateti@gmail.com', // Your Gmail address
//     pass: 'advo bcov nrbr asma', // Your app password or Gmail password
//   },
//   tls: {
//     rejectUnauthorized: false // Allow self-signed certificates (use cautiously)
//   }
// });

// // Endpoint for checking if user is authenticated
// app.get("/authenticated", (req, res) => {
//   // Placeholder logic to check if user is authenticated
//   const isAuthenticated = false; // Replace this with actual authentication logic

//   if (isAuthenticated) {
//     res.json({ status: "authenticated", user: "user@example.com" }); // Replace with actual user info
//   } else {
//     res.json({ status: "not-authenticated" });
//   }
// });

// // Endpoint for user login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await collection.findOne({ email: email });
//     if (!user) {
//       res.json({ status: "invalid" });
//     } else {
//       const isValid = await bcrypt.compare(password, user.password);
//       if (isValid) {
//         res.json({ status: "authenticated", user: user.email });
//       } else {
//         res.json({ status: "invalid" });
//       }
//     }
//   } catch (e) {
//     res.json({ status: "fail" });
//   }
// });

// // Endpoint for user signup
// app.post("/signup", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const check = await collection.findOne({ email: email });
//     if (check) {
//       res.json({ status: "exist" });
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const data = {
//         email: email,
//         password: hashedPassword,
//         resetToken: null,
//         resetTokenExpiry: null
//       };
//       await collection.insertMany([data]);
//       res.json({ status: "created", user: email });
//     }
//   } catch (e) {
//     res.json({ status: "fail" });
//   }
// });

// // Endpoint for forgotten password
// app.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await collection.findOne({ email: email });
//     if (!user) {
//       return res.json({ status: "invalid-email" });
//     }

//     // Generate a reset token
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

//     // Update user with reset token and expiry
//     await collection.updateOne(
//       { email: email },
//       { $set: { resetToken, resetTokenExpiry } }
//     );

//     // Send email with reset link (replace with your frontend URL)
//     const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
//     const mailOptions = {
//       to: email,
//       subject: 'Password Reset',
//       text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ status: "reset-link-sent" });
//   } catch (e) {
//     res.json({ status: "fail" });
//   }
// });

// // Endpoint for resetting password
// app.post("/reset-password/:token", async (req, res) => {
//   const { token } = req.params; // Get the token from the URL
//   const { newPassword } = req.body; // Get the new password from the request body

//   console.log("Resetting password with token:", token);
//   console.log("New password:", newPassword);

//   try {
//     // Query the user by resetToken and ensure resetTokenExpiry has not passed
//     const user = await collection.findOne({
//       resetToken: token,
//       resetTokenExpiry: { $gt: Date.now() } // Token must not be expired
//     });

//     if (!user) {
//       return res.json({ status: "invalid-token" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user's password and reset the token fields
//     const updateResult = await collection.updateOne(
//       { email: user.email },
//       {
//         $set: {
//           password: hashedPassword,
//           resetToken: null,
//           resetTokenExpiry: null
//         }
//       }
//     );

//     if (updateResult.modifiedCount === 1) {
//       res.json({ status: "password-reset-success" });
//     } else {
//       res.json({ status: "fail", message: "Password reset failed. Please try again." });
//     }
//   } catch (e) {
//     res.json({ status: "fail" });
//   }
// });

// // Start the server
// app.listen(8000, (err) => {
//   if (err) {
//     console.error("Error starting server:", err);
//   } else {
//     console.log("Server is running on port 8000");
//   }
// });
import express from "express";
import collection from "./mongo.js";
import cors from "cors";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'harshan.mateti@gmail.com', // Your Gmail address
    pass: 'advo bcov nrbr asma', // Your app password or Gmail password
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates (use cautiously)
  }
});

// Middleware to check authentication
const authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ status: "not-authenticated" });
  }

  try {
    const user = await collection.findOne({ resetToken: token });
    if (!user) {
      return res.status(401).json({ status: "not-authenticated" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

// Endpoint for checking if user is authenticated
app.get("/authenticated", authenticateUser, (req, res) => {
  res.json({ status: "authenticated", user: req.user.email });
});

// Endpoint for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email });
    if (!user) {
      return res.json({ status: "invalid" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      res.json({ status: "authenticated", user: user.email });
    } else {
      res.json({ status: "invalid" });
    }
  } catch (e) {
    res.json({ status: "fail" });
  }
});

// Endpoint for user signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.json({ status: "exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      email,
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    };
    await collection.insertMany([data]);
    res.json({ status: "created" });
  } catch (e) {
    res.json({ status: "fail" });
  }
});

// Endpoint for forgotten password
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await collection.findOne({ email });
    if (!user) {
      return res.json({ status: "invalid-email" });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    await collection.updateOne(
      { email },
      { $set: { resetToken, resetTokenExpiry } }
    );

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ status: "reset-link-sent" });
  } catch (e) {
    res.json({ status: "fail" });
  }
});

// Endpoint for resetting password
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await collection.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({ status: "invalid-token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await collection.updateOne(
      { email: user.email },
      {
        $set: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null
        }
      }
    );

    res.json({ status: "password-reset-success" });
  } catch (e) {
    res.json({ status: "fail" });
  }
});

// Start the server
app.listen(8000, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("Server is running on port 8000");
  }
});

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { notFound } = require("./utils/errorHandler");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const { app, server } = require("./socket/socket");
require("dotenv").config();

// Inorder to get the root directory
const dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
// To allow API request from any other port we use CORS
// origin * means its accepts request from any port
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // Check if the request origin is allowed
      if (!origin || origin === "https://chat-app-production-wiuc.onrender.com") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));

// Inorder to access the frontend(chat-client) folder and access the dist folder(after building the frontend application)
app.use(express.static(path.join(dirname, "chat-client", "dist")));

mongoose
  .connect(process.env.MONGODB_URI)
  .then((client) =>
    server.listen(PORT, () => console.log("SERVER CONNECTED AT PORT: ", PORT))
  )
  .catch((err) => console.log("Error while conneting to DB: ", err));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// Inorder to access the frontend build file using the server
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "chat-client", "dist", "index.html"));
});

// middleware to handle unsupported routes error
app.use(notFound);
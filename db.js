require("dotenv").config();
const mongoose = require("mongoose");

// Access your MongoDB connection string from secrets
const mongoURI = process.env.MONGODB;

// Use mongoose to connect
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

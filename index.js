require("./db");

// const eventRouter = require("./src/Routes/event.routes");
// const volunteerRouter = require("./src/Routes/volunteer.routes");
const userRouter = require("./src/Routes/user.routes");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api/event", eventRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h1> Loot Bazaar 🚀 </h1>");
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.use((req, res) => {
  res.status(404).json({ error: "No route found!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

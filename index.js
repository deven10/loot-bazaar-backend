require("./db");

const userRouter = require("./src/Routes/user.routes");
const authRouter = require("./src/Routes/auth.routes");
const categoryRouter = require("./src/Routes/category.routes");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

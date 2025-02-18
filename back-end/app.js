const express = require("express");
const app = express();
const connectDB = require("./db");
const apiRoutes = require("./routes/apiRoutes");
const cors = require("cors");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/v1", apiRoutes);

module.exports = app;

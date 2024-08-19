require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 5000;
const EventRoute = require("./routes/eventRoute");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4000",
  })
);

connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Test OK");
});
app.use("/", EventRoute);

app.listen(port, () => {
  console.log(`Server is runing at port : http://localhost:${port}`);
});

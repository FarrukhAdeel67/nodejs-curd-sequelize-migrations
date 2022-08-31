const express = require("express");
const moment = require("moment");
const port = 4000;
const app = express();
require("dotenv").config();
const studentRouter = require("./routes/student");
app.use(express.json());

app.use("/api/students", studentRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

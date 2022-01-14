const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const port = process.env.PORT || 4001;

app.use(
  express.urlencoded({
    extended: true,
  })
);
const DB = process.env.DB_URI;
console.log("db url", DB);
app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`Running on Port http://localhost:${port}`);
});

app.use("/blogs", blogRoute);
app.use("/users", userRoute);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => console.log("db error", error.message));

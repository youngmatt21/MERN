const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//middlewire
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  })
);
const port = 5000;

// Database configuration
const URI =
  "mongodb+srv://dizas9:yoyo@cluster0.kxj2bsu.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//routes defination

app.use("/api/user/", require("./routes/auth"));

app.get("/", (req, res) => res.send("Hello World vercel!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());




const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const partRequestRouter = require("./routes/partRequest");
const inventoryRouter = require("./routes/inventory");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", partRequestRouter);
app.use('/', inventoryRouter);
//app.use('/', partRequestRouter1);


connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
    console.error(err);
  });

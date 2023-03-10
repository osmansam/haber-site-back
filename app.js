require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const { authenticateUser } = require("./middleware/authentication");

// database
const connectDB = require("./db/connect");
//cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//  routers
const authRouter = require("./routes/authRoutes");
const haberRouter = require("./routes/haberRoutes");
const baslikRouter = require("./routes/baslikRoutes");
// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(fileUpload({ useTempFiles: true }));

//app.use("api/v1") stuff will come here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/habers", haberRouter);
app.use("/api/v1/basliks", baslikRouter);

const port = process.env.PORT || 3002;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();

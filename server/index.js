const express = require("express");
const app = express();
const database = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const userRoute = require("./Routes/User");
const friendRoute = require("./Routes/Friend");

const cors = require('cors');

// Update CORS settings to include multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://friend-circle.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you are sending cookies or authentication headers
}));

const PORT = process.env.PORT || 4000;

// Database connect
database.connect();
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/friend", friendRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

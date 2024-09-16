const express = require("express")
const app = express();
const database = require("./config/database")
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser")
const userRoute = require("./Routes/User")
const friendRoute = require("./Routes/Friend")

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Or use "*" to allow all origins, but be cautious
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you are sending cookies or authentication headers
}));

const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/friend", friendRoute);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

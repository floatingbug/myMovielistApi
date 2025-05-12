require("dotenv").config();
require("module-alias/register");
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const {connectDB} = require("./src/config/db");
const apiRouter = require("./src/routes");


connectDB();


app.use(cors({
	origin: "*",
}));

app.use(express.json());

app.use("/api", apiRouter);


//handle fatal errors
app.use("/", (err, req, res, next) => {
	console.log("Fatal Error: ", err);

	res.status(500).json({
		success: false,
		errors: ["Internal Server Error"],
	});
});


httpServer.listen(PORT, () => {
	console.log("App is listen on port: " + PORT);
});

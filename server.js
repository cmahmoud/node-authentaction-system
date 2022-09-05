const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dbConnection = require("./lib/db");

const AuthRouter = require("./routes/auth.route");

dotenv.config();
dbConnection();

const app = express();
const port = 5000;
const mode = process.env.mode;

app.use(logger("dev"));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", AuthRouter);

app.listen(port, function () {
    console.log(`server runing on ${port}:${mode}`);
});

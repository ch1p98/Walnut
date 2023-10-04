const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
// routes
const mainRoute = require("./routes/main_routes");
const userRoutes = require("./routes/user_routes");

require("dotenv").config();
console.log("process.env: " + process.env);

app.use(express.json());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    name: "sid",
    saveUninitialized: true,
    resave: false,
  })
);
app.set("view engine", "pug");
app.use("/public", express.static("./public"));
app.use("/images", express.static("./images"));

const port = 3000;

app.use("/", mainRoute);

app.get("/api", (req, res) => {
  res.send("API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

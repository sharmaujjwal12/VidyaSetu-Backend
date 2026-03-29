let dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const cors = require("cors");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
let mongoose = require("mongoose");
let MONGO_URL =
  "mongodb+srv://ujjwal:ujjwal@ujjwal.wajx9iv.mongodb.net/VidyaSetu?appName=ujjwal";
let bodyParser = require("body-parser");
let express = require("express");
let app = express();
const UsersRouter = require("./routes/authentication");
const hostRouter = require("./routes/host");
const multer = require("multer");
const videoRouter = require("./routes/UploadVideo");
const path = require("path");
const newsRouter = require("./routes/NewsRouter");
const paymentRouter = require("./routes/Payment");

// app.use(express.static(path.join(rootDir,'public')));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.isLoggedIn = req.session?.isLoggedIn || false;
  next();
});
const store = new mongoDBStore({
  uri: MONGO_URL,
  collection: "sessions",
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: "Quiz",
    resave: false,
    saveUninitialized: true,
    store: store,
  }),
);

app.use("/api/Quiz", UsersRouter);
app.use("/api",paymentRouter)
app.use("/api", hostRouter);
app.use("/api/news",newsRouter);
app.use("/api",videoRouter);

let PORT = 3000;
mongoose.connect(MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server Listening At : http://localhost:${PORT}`);
  });
});


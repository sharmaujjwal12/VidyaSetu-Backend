require("dotenv").config(); // ye .env file read karega
let dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const cors = require("cors");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
let mongoose = require("mongoose");
let MONGO_URL = process.env.MONGODB_URL;
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
const allowedOrigins = [
  "http://localhost:5173",
  "https://vidya-setu-front-end.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// optional preflight handler
app.options("*", cors());

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
app.use("/api", paymentRouter);
app.use("/api", hostRouter);
app.use("/api/news", newsRouter);
app.use("/api", videoRouter);
app.get("/", (req, res) => {
  res.send("VidyaSetu Backend Running 🚀");
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server Listening At : http://localhost:${PORT}`);
  });
});

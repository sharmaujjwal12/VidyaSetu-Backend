// app.js
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const path = require("path");

// Routers
const UsersRouter = require("./routes/authentication");
const hostRouter = require("./routes/host");
const videoRouter = require("./routes/UploadVideo");
const newsRouter = require("./routes/NewsRouter");
const paymentRouter = require("./routes/Payment");

const app = express();

// -------------------- CORS --------------------

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",                    // frontend dev
  "https://vidya-setu-front-end.vercel.app", // frontend prod
];

// Normal CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman or non-browser
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

// Preflight requests handler (avoids '* PathError')
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }
  next();
});

// -------------------- Express middlewares --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- Session setup --------------------
const store = new mongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

app.use(session({
  secret: "Quiz",
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
}));

// Make session info available in all routes
app.use((req, res, next) => {
  res.isLoggedIn = req.session?.isLoggedIn || false;
  next();
});

// -------------------- Static files --------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------- Routes --------------------
app.use("/api/Quiz", UsersRouter);
app.use("/api", paymentRouter);
app.use("/api", hostRouter);
app.use("/api/news", newsRouter);
app.use("/api", videoRouter);

// Root route
app.get("/", (req, res) => {
  res.send("VidyaSetu Backend Running 🚀");
});

// -------------------- Catch-all 404 --------------------
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// -------------------- MongoDB & Server --------------------
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => {
      console.log(`Server Listening At : http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
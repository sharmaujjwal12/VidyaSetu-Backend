// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const path = require("path");

const UsersRouter = require("./routes/authentication");
const hostRouter = require("./routes/host");
const videoRouter = require("./routes/UploadVideo");
const newsRouter = require("./routes/NewsRouter");
const paymentRouter = require("./routes/Payment");

const app = express();

// -------------------- CORS --------------------

// List of allowed origins
const allowedOrigins = [
  "http://localhost:5173",                    // frontend dev
  "https://vidya-setu-front-end.vercel.app", // frontend prod
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser tools like Postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // <-- allow cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Optional: preflight handler for complex requests
app.options("*", cors());

// -------------------- Express Middlewares --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
const store = new mongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: "Quiz",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      httpOnly: true, // cannot be accessed by JS
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "lax", // allows cross-origin requests with credentials
    },
  })
);

// Make session info available in all routes
app.use((req, res, next) => {
  res.isLoggedIn = req.session?.isLoggedIn || false;
  next();
});

// -------------------- Static Files --------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------- Routes --------------------
app.use("/api/Quiz", UsersRouter);
app.use("/api", paymentRouter);
app.use("/api", hostRouter);
app.use("/api/news", newsRouter);
app.use("/api", videoRouter);

app.get("/", (req, res) => {
  res.send("VidyaSetu Backend Running 🚀");
});

// -------------------- MongoDB & Server --------------------
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server Listening At : http://localhost:${PORT}`);
  });
});
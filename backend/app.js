const express = require("express");
const path = require("node:path");
const cors = require("cors");
const indexRouter = require("./routes/indexRouter.js");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  'http://127.0.0.1:5173',
  "https://where-is-waldo-production-deaa.up.railway.app",
  process.env.CLIENT_FRONTEND_URL,
].filter(Boolean);

/*const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));*/
const corsOptions = {
  origin: "https://where-is-waldo-production-deaa.up.railway.app",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express app listening on port ${PORT}`);
});
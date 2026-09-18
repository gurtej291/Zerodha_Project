require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { HoldingModel } = require("./model/HoldingModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "zerodha_jwt_secret_key_2024";

if (!uri) {
  console.error("MONGO_URL is not set in environment");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ─── AUTH ROUTES ──────────────────────────────────────────────────────────────

// POST /signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ message: "Email already registered. Please log in." });

    const hashed = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email: email.toLowerCase(), password: hashed });
    await user.save();

    // Seed default holdings and positions for the new user
    const defaultHoldings = [
      { userId: user._id, name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
      { userId: user._id, name: "HDFCBANK",   qty: 2, avg: 1383.40, price: 1522.35, net: "+10.04%", day: "+0.11%" },
      { userId: user._id, name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.40, net: "+3.49%", day: "+0.21%" },
      { userId: user._id, name: "INFY",       qty: 1, avg: 1350.50, price: 1555.45, net: "+15.18%", day: "-1.60%" },
      { userId: user._id, name: "ITC",        qty: 5, avg: 202.00,  price: 207.90,  net: "+2.92%", day: "+0.80%" },
      { userId: user._id, name: "KPITTECH",   qty: 5, avg: 250.30,  price: 266.45,  net: "+6.45%", day: "+3.54%" },
      { userId: user._id, name: "M&M",        qty: 2, avg: 809.90,  price: 779.80,  net: "-3.72%", day: "-0.01%" },
      { userId: user._id, name: "RELIANCE",   qty: 1, avg: 2193.70, price: 2112.40, net: "-3.71%", day: "+1.44%" },
      { userId: user._id, name: "SBIN",       qty: 4, avg: 324.35,  price: 430.20,  net: "+32.63%", day: "-0.34%" },
      { userId: user._id, name: "SGBMAY29",   qty: 2, avg: 4727.00, price: 4719.00, net: "-0.17%", day: "+0.15%" },
      { userId: user._id, name: "TATAPOWER",  qty: 5, avg: 104.20,  price: 124.15,  net: "+19.15%", day: "-0.24%" },
      { userId: user._id, name: "TCS",        qty: 1, avg: 3041.70, price: 3194.80, net: "+5.03%", day: "-0.25%" },
      { userId: user._id, name: "WIPRO",      qty: 4, avg: 489.30,  price: 577.75,  net: "+18.08%", day: "+0.32%" },
    ];

    const defaultPositions = [
      { userId: user._id, product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
      { userId: user._id, product: "CNC", name: "JUBLFOOD",  qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
    ];

    await HoldingModel.insertMany(defaultHoldings);
    await PositionsModel.insertMany(defaultPositions);

    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// POST /login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// GET /me  — verify token and return user info
app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ─── PROTECTED DATA ROUTES ────────────────────────────────────────────────────

// GET /allHoldings — only this user's holdings
app.get("/allHoldings", authMiddleware, async (req, res) => {
  try {
    const holdings = await HoldingModel.find({ userId: req.userId });
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /allPositions — only this user's positions
app.get("/allPositions", authMiddleware, async (req, res) => {
  try {
    const positions = await PositionsModel.find({ userId: req.userId });
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /allOrders — only this user's orders
app.get("/allOrders", authMiddleware, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /newOrder — save order linked to user
app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      userId: req.userId,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    await newOrder.save();
    res.json({ message: "Order saved!" });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── DB CONNECT & START ───────────────────────────────────────────────────────
const connectWithRetry = async (retries = 5, delayMs = 3000) => {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    if (retries > 0) {
      console.log(`Retrying in ${delayMs / 1000}s (${retries} left)...`);
      setTimeout(() => connectWithRetry(retries - 1, Math.min(delayMs * 2, 30000)), delayMs);
    } else {
      console.error("All retries exhausted. Exiting.");
      process.exit(1);
    }
  }
};

connectWithRetry();

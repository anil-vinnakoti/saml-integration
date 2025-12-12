const express = require("express");
const passport = require("passport");
const SamlStrategy = require("passport-saml").Strategy;
const samlConfig = require("./samlConfig");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(passport.initialize());

// SAML Strategy
passport.use(
  new SamlStrategy(samlConfig, (profile, done) => {
    // This is user info extracted from SAML response
    return done(null, profile);
  })
);

// 1️⃣ Trigger SAML Login
app.get(
  "/auth/saml/login",
  passport.authenticate("saml", { failureRedirect: "/login" }),
  (req, res) => {
    res.send("Redirecting to IdP…");
  }
);

// 2️⃣ Handle SAML Response (Callback)
app.post(
  "/auth/saml/callback",
  passport.authenticate("saml", { failureRedirect: "/login", session: false }),
  (req, res) => {
    // For demo, generate a simple token (normally JWT)
    const token = Buffer.from(JSON.stringify(req.user)).toString("base64");

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/sso?token=${token}`);
  }
);

// 3️⃣ Protected route for user info
app.get("/auth/me", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const user = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
  res.json(user);
});

app.listen(4000, () => console.log("SAML backend running on 4000"));

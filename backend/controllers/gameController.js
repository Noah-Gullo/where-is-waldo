const db = require("../db/queries.js");
const jwt = require("jsonwebtoken");

async function checkCoordinates(req, res) {
  try {
    const { x, y, name } = req.body;

    const valid = await db.findChar(name, x, y);

    return res.json({ valid });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function startGame(req, res) {
  try {
    const token = jwt.sign(
      {
        startedAt: Date.now(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to start game",
    });
  }
}

async function finishGame(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Invalid authorization header",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded.startedAt) {
      return res.status(400).json({
        error: "Token does not contain a start time",
      });
    }

    const finishedAt = Date.now();

    const durationMs =
      finishedAt - decoded.startedAt;

    return res.json({
      durationMs,
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}

module.exports = {
  checkCoordinates,
  startGame,
  finishGame,
};
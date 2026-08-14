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
    const {game} = req.body;
    const token = jwt.sign(
      {
        startedAt: Date.now(),
        game,
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

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Invalid authorization header",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const durationMs =
      Date.now() - decoded.startedAt;

    const resultToken = jwt.sign(
      {
        durationMs,
        game: decoded.game,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    return res.json({
      durationMs,
      resultToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}

async function submitScore(req, res) {
  try {
    const { name, resultToken } = req.body;

    if (!name || !resultToken) {
      return res.status(400).json({
        error: "Name and result token are required",
      });
    }

    const decoded = jwt.verify(
      resultToken,
      process.env.JWT_SECRET
    );

    const { durationMs, game } = decoded;
    
    if (
      typeof durationMs !== "number" ||
      !game
    ) {
      return res.status(400).json({
        error: "Invalid result token",
      });
    }

    const score = await db.createScore(
      name,
      durationMs,
      game
    );

    return res.status(201).json({
      score,
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: "Invalid or expired result token",
    });
  }
}

module.exports = {
  checkCoordinates,
  startGame,
  finishGame,
  submitScore
};
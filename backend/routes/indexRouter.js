const { Router } = require('express');
const { checkCoordinates, startGame, finishGame, submitScore } = require("../controllers/gameController");
const indexRouter = Router();

indexRouter.post("/game", startGame);
indexRouter.post("/game/finish", finishGame);
indexRouter.post("/leaderboard", submitScore);
indexRouter.post("/check", checkCoordinates);

module.exports = indexRouter
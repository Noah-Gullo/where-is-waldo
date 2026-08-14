const { Router } = require('express');
const { checkCoordinates } = require("../controllers/gameController");
const indexRouter = Router();

indexRouter.post("/check", checkCoordinates);

module.exports = indexRouter
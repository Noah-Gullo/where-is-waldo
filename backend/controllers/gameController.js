const db = require("../db/queries.js");

async function checkCoordinates(req, res){
    try {
        const { x, y, name } = req.body;

        const valid = await db.findChar(name, x, y);

        return res.json({ valid: valid }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    checkCoordinates
}
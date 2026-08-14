const { prisma } = require("./prisma");

async function findChar(name, x, y){
    const chars = await prisma.character.findMany({
        where: {
            name: name
        }
    })

    for(let i = 0; i < chars.length; i++) {
        if (x >= chars[i].left && x <= chars[i].right && y >= chars[i].top && y <= chars[i].bottom) {
            return true;
        }
    }

    return false;
}

module.exports = {
    findChar,
}
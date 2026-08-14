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

async function createScore(name, timeMs, board) {
  return prisma.score.create({
    data: {
      name,
      timeMs,
      board,
    },
  });
}

async function getTimes(board){
    return prisma.score.findMany({
        where: {
            board: board,
        },
        orderBy: {
            timeMs: "asc",
        },
    });
}

module.exports = {
    findChar,
    createScore,
    getTimes
}
require('dotenv').config();
const { prisma } = require('../lib/prisma.js');

async function main(){
    console.log("seeding");
    await prisma.character.createMany({
        data: [
            { name: 'Waldo', bottom: 200, top: 135, left: 961, right: 995},
            { name: 'Octopus', bottom: 936, top: 835, left: 552, right: 881},
            { name: 'Swordfish', bottom: 697, top: 597, left: 12, right: 141 },
            { name: 'Waldo', bottom: 580, top: 537, left: 1338, right: 1365},
            { name: 'Fly on a Plate', bottom: 349, top: 295, left: 727, right: 815},
            { name: 'Mimic Chest', bottom: 986, top: 921, left: 727, right:959},
            { name: 'Waldo', bottom: 741, top: 693, left: 237, right: 272},
            { name: 'Clock Man', bottom: 340, top: 258, left: 1151, right: 1198},
            { name: 'Elephant', bottom: 636, top: 558, left: 1217, right: 1321}
        ]
    })
    console.log("done");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { faker } = require("@faker-js/faker");
const Point = require("../models/point.model");
const { parentPort } = require("worker_threads");

function* infiniteSequence() {
    let num = 0;
    while (true) {
        yield num;
        num += 1;
    }
}

async function createBulk({ records_each_thread, size_batch, ith }) {
    const points = [];
    const result = {
        ith,
    };

    console.log(`Thread ${ith} is running`);

    for (let i of infiniteSequence()) {
        if (i >= records_each_thread) {
            break;
        }

        if (i !== 0 && i % size_batch === 0) {
            await Point.bulkCreate(points);
            if (!result[points.length]) {
                result[points.length] = 1;
            } else {
                result[points.length] += 1;
            }
            points.length = 0;
        }

        points.push({
            point: faker.datatype.number({ min: -30, max: 30 }),
            userId: faker.datatype.number({ min: 1, max: 200 }),
        });
    }

    if (points.length) {
        if (!result[points.length]) {
            result[points.length] = 1;
        }
        await Point.bulkCreate(points);
    }

    parentPort.postMessage({ exit: true });
}

parentPort.on("message", (incoming) => {
    createBulk(incoming);
});

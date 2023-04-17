const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { Worker } = require("worker_threads");

const os = require("os");
const numCPUs = os.cpus().length;

console.log(`Num of threads::::${numCPUs}`);

const NUM_RECORDS = 50_000_000;
const SIZE_BATCH = 1000;

const THREAD_COUNT = numCPUs > 4 ? numCPUs - 2 : 1;

function createWorker({ ith, records_each_thread }) {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./src/workers/multi.workers.js");
        worker.postMessage({
            records_each_thread,
            size_batch: SIZE_BATCH,
            ith,
        });
        worker.on("message", ({ exit }) => {
            if (exit) {
                console.log(`Thread ${ith} was done!!!`);
                resolve(true);
            }
        });
        worker.on("error", (code) => {
            reject(code);
            console.log(new Error(`Save Worker error with exit code ${code}`));
        });
        worker.on("exit", (code) =>
            console.log(`Save Worker stopped with exit code ${code}`)
        );
    });
}

const main = async () => {
    const workerPromises = [];

    for (let i = 0; i < THREAD_COUNT; i += 1) {
        workerPromises.push(
            createWorker({
                ith: i,
                records_each_thread: Math.floor(NUM_RECORDS / THREAD_COUNT),
            })
        );
    }

    if (NUM_RECORDS % THREAD_COUNT !== 0) {
        workerPromises.push(
            createWorker({
                ith: THREAD_COUNT,
                records_each_thread: NUM_RECORDS % THREAD_COUNT,
            })
        );
    }

    await Promise.all(workerPromises);
    process.exit(0);
};

main();

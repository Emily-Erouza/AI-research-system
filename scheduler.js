// const cron = require("node-cron");
// const runPipeline = require("./main");

// function startScheduler() {
//   // Every Monday at 08:00
//   cron.schedule("0 8 * * 1", async () => {
//     console.log(" Running weekly AI report...");
//     await runPipeline();
//   });

//   console.log("Scheduler active");
// }

// module.exports = startScheduler;

const cron = require("node-cron");
const runPipeline = require("./pipeline");

function startScheduler() {
  console.log("Scheduler started...");

  // 🔥 TEST MODE: runs every 2 minutes
  cron.schedule("*/2 * * * *", async () => {
    console.log("Running test AI report...");

    try {
      await runPipeline();
      console.log("Report generated and sent successfully");
    } catch (err) {
      console.error("Error running pipeline:", err);
    }
  });
}

module.exports = startScheduler;
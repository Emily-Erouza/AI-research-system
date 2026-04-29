const cron = require("node-cron");
const runPipeline = require("./main");

function startScheduler() {
  // Every Monday at 08:00
  cron.schedule("0 8 * * 1", async () => {
    console.log(" Running weekly AI report...");
    await runPipeline();
  });

  console.log("Scheduler active");
}

module.exports = startScheduler;
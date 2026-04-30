require("dotenv").config();

const runPipeline = require("./pipeline");
const startScheduler = require("./scheduler");

const mode = process.env.MODE || "dev";

if (mode === "dev") {
  (async () => {
    try {
      await runPipeline();
    } catch (err) {
      console.error("Pipeline failed:", err);
    }
  })();
}

if (mode === "prod") {
  startScheduler();
}
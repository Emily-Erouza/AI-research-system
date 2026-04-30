// require("dotenv").config();

// const runPipeline = require("./pipeline");
// const startScheduler = require("./scheduler");

// const mode = process.env.MODE || "dev";

// if (mode === "dev") {
//   (async () => {
//     try {
//       await runPipeline();
//     } catch (err) {
//       console.error("Pipeline failed:", err);
//     }
//   })();
// }

// if (mode === "prod") {
//   startScheduler();
// }


require("dotenv").config();

const express = require("express");
const runPipeline = require("./pipeline");
const startScheduler = require("./scheduler");

const app = express();
const PORT = process.env.PORT || 3000;

const mode = process.env.MODE || "dev";

console.log("Running in mode:", mode);

// ✅ Start a simple server (THIS fixes Render issue)
app.get("/", (req, res) => {
  res.send("AI Research System is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ Your existing logic
if (mode === "dev") {
  (async () => {
    try {
      console.log("Running pipeline once (dev mode)...");
      await runPipeline();
    } catch (err) {
      console.error("Pipeline failed:", err);
    }
  })();
}

if (mode === "prod") {
  startScheduler();
}
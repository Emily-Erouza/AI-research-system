const planner = require("./agents/planner");
const collector = require("./agents/collector");
const synthesizer = require("./agents/synthesizer");
const verifier = require("./agents/verifier");
const generatePDF = require("./utils/pdf");

async function runPipeline() {
  console.log("1. Planning...");
  const plan = await planner();

  console.log("2. Collecting data...");
  const rawData = await collector(plan);

  console.log("3. Verifying...");
  const cleanData = await verifier(rawData);

  console.log("4. Synthesizing report...");
  const report = await synthesizer(cleanData);

  console.log("5. Saving PDF...");
  await generatePDF(report);

  console.log("DONE ✔ Weekly report generated");
}

module.exports = runPipeline;
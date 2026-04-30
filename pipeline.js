// const planner = require("./agents/planner");
// const collector = require("./agents/collector");
// const synthesizer = require("./agents/synthesizer");
// const verifier = require("./agents/verifier");
// const generatePDF = require("./utils/pdf");
// const sendReport = require("./utils/email"); 

// async function runPipeline() {
//   console.log("1. Planning...");
//   const plan = await planner();

//   console.log("2. Collecting data...");
//   const rawData = await collector(plan);

//   console.log("3. Verifying...");
//   const cleanData = await verifier(rawData);

//   console.log("4. Synthesizing report...");
//   const report = await synthesizer(cleanData);

//   console.log("5. Saving PDF...");
//   await generatePDF(report);

//   console.log("6. Sending email...");
//   await sendReport("./reports/weekly_report.pdf");

//   console.log("DONE ✔ Weekly report generated");
// }

// module.exports = runPipeline;


const planner = require("./agents/planner");
const collector = require("./agents/collector");
const synthesizer = require("./agents/synthesizer");
const verifier = require("./agents/verifier");
const generatePDF = require("./utils/pdf");
const sendReport = require("./utils/email");

async function runPipeline() {
  try {
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

    console.log("6. Sending email...");

    // 👇 MULTI-SUBSCRIBER SYSTEM (THIS IS THE FIX)
    const subscribers = [
      "emily@infinity-tools.com",
      "emilys@thecodingground.com"
      // add more emails here or later move to DB
    ];

    for (const email of subscribers) {
      await sendReport(email, "./reports/weekly_report.pdf");
      console.log(`Email sent to: ${email}`);
    }

    console.log("DONE ✔ Weekly report generated");

  } catch (err) {
    console.error("Pipeline failed:", err);
  }
}

module.exports = runPipeline;
const hermes = require("../hermes");
const fs = require("fs-extra");
const path = require("path");

module.exports = async function synthesizer(data) {

  const prompt = `
You are writing a WEEKLY AI INTELLIGENCE REPORT for paying subscribers.

You are a senior AI analyst writing for a business and investor audience.

CRITICAL RULES:
- You MUST ONLY use the DATA provided
- NEVER output arrays, JSON, or raw lists
- ALWAYS write full analytical paragraphs
- Convert data into insights (not summaries)
- Explain WHY each trend matters for business and industry
- Think like Bloomberg / TechCrunch analyst

DATA:
${JSON.stringify(data, null, 2)}

OUTPUT FORMAT:

# Executive Summary
3–5 sentences summarising the most important developments

# Key Trends
- Explain each trend with business impact

# Notable Releases
- Key developments explained in context

# Insights
- Deep analysis of implications

# Conclusion
- Future outlook and predictions
`;

  let report = await hermes(prompt);

  // 🚨 STRICT VALIDATION (better than your old fix)
  if (!report) {
    throw new Error("Hermes returned empty report");
  }

  // If Hermes still returns wrong type → force it into string safely
  if (typeof report !== "string") {
    report = Array.isArray(report)
      ? report.map(item => `- ${item}`).join("\n")
      : JSON.stringify(report, null, 2);
  }

  // 🚨 FINAL CHECK: prevent planner leakage
  if (typeof report !== "string") {
  throw new Error("Synthesizer expected markdown string");
}

  console.log("FINAL REPORT FROM HERMES:");
  console.log(report);

  const mdPath = path.join(__dirname, "../reports/weekly_report.md");
  await fs.outputFile(mdPath, report);

  return report;
};
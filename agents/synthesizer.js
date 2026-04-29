const hermes = require("../hermes");
const fs = require("fs-extra");
const path = require("path");

module.exports = async function synthesizer(data) {

  const prompt = `
You are a senior AI research analyst writing a WEEKLY INTELLIGENCE REPORT.

You MUST:
- Write in clean Markdown format
- NEVER output JSON or arrays
- NEVER repeat raw input data
- Convert data into insights and analysis

DATA:
${JSON.stringify(data, null, 2)}

OUTPUT FORMAT:

# Executive Summary
(3–5 sentences)

# Key Trends
- Bullet points with explanations

# Notable Releases
- Important items explained

# Insights
- Why this matters for AI industry

# Conclusion
- Future outlook
`;

  let report = await hermes(prompt);

  // 🔥 SAFETY CHECK: Hermes sometimes returns JSON instead of text
  if (Array.isArray(report)) {
    report = `
# Executive Summary
AI research activity this week shows developments across multiple areas.

# Key Trends
${report.map(item => `- ${item}`).join("\n")}

# Conclusion
This reflects ongoing activity in the AI ecosystem.
`;
  }

  if (typeof report !== "string") {
    report = JSON.stringify(report, null, 2);
  }

  // 🔍 DEBUG (keep this for now)
  console.log("FINAL REPORT FROM HERMES:");
  console.log(report);

  // 📁 Ensure folder exists + write markdown file
  const mdPath = path.join(__dirname, "../reports/weekly_report.md");
  await fs.outputFile(mdPath, report);

  return report;
};
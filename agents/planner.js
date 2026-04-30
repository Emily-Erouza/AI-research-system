const hermes = require("../hermes");

module.exports = async function planner() {

  const prompt = `
You are a research planning agent.

Return 5–8 high impact AI topics for this week.

Return JSON array only.
`;

  const result = await hermes(prompt);

  try {
    return JSON.parse(result);
  } catch (err) {
    console.log("Planner parse error:", result);
    throw new Error("Planner did not return valid JSON");
  }
};
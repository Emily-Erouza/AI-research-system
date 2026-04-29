const hermes = require("../hermes");

module.exports = async function planner() {
  const prompt = `
You are a research planning agent.

Return 5–8 high impact AI topics for this week.
Focus on:
- new AI releases
- frameworks
- infrastructure
- robotics

Return JSON array only.
`;

  const response = await hermes(prompt);

  return JSON.parse(response);
};
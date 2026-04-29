module.exports = async function hermes(prompt) {

  console.log("HERMES PROMPT RECEIVED:");
  console.log(prompt);

  // 🚨 TEMP FIX: simulate real LLM behavior properly
  // IMPORTANT: this MUST NOT return planner data anymore

  if (prompt.includes("WEEKLY INTELLIGENCE REPORT")) {
    return `
# Executive Summary
This week shows continued acceleration in AI development across multiple domains including agents, infrastructure, and model improvements.

# Key Trends
- AI agents are becoming more autonomous and tool-driven
- LLM releases are focusing on reasoning improvements
- Robotics integration with AI models is increasing
- AI infrastructure scaling continues rapidly

# Notable Releases
- New agent frameworks emerging
- Improved LLM reasoning benchmarks

# Insights
The AI ecosystem is shifting toward autonomous systems rather than static models.

# Conclusion
We expect continued rapid acceleration in agent-based AI systems.
`;
  }

  // fallback for planner
  return JSON.stringify([
    "AI Agents",
    "LLM releases",
    "Robotics updates",
    "AI infrastructure trends"
  ]);
};
module.exports = async function hermes(prompt) {

  const isPlanner = prompt.toLowerCase().includes("research planning agent");
  const isSynthesizer = prompt.toLowerCase().includes("weekly ai intelligence report");

  // 🟢 PLANNER → MUST return VALID JSON STRING
  if (isPlanner) {
    return JSON.stringify([
      "AI Agents",
      "LLM releases",
      "Robotics updates",
      "AI infrastructure trends",
      "AI safety research",
      "Multimodal models"
    ]);
  }

  // 🟣 SYNTHESIZER → MUST return markdown string
  if (isSynthesizer) {
    return `
# Executive Summary
AI development continues to accelerate across multiple domains.

# Key Trends
- AI agents are becoming more autonomous
- LLMs are improving reasoning ability
- Robotics is integrating with foundation models
- Infrastructure scaling is increasing

# Insights
The industry is shifting toward autonomous AI systems.

# Conclusion
We expect continued rapid growth in agent-based systems.
`;
  }

  return "Unknown agent";
};
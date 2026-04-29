module.exports = async function collector(plan) {
  console.log("Collector received plan:", plan);

  let results = [];

  for (const topic of plan) {
    results.push({
      title: `Latest updates on ${topic}`,
      url: "https://example.com",
      relevanceScore: 0.8
    });
  }

  return results;
};
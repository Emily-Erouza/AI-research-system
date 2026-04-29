module.exports = async function verifier(data) {
  return data.filter(item => {
    return (
      item.title &&
      item.url &&
      item.relevanceScore > 0.6
    );
  });
};
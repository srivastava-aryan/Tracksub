export function getTotalCost(subscriptions, selectedTag = "All") {
  const filteredSubs =
    selectedTag === "All"
      ? subscriptions
      : subscriptions.filter((sub) => sub.tag === selectedTag);

  return filteredSubs.reduce(
    (sum, sub) => sum + parseFloat(sub.price || 0),
    0
  );
}

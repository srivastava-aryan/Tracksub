import { exportSubscriptionsToCSV } from "../utils/exportCSV";
import SubscriptionCard from "../components/SubscriptionCard";
import { useSubscriptions } from "../context/SubscriptionContext";
import { useState } from "react";

const Dashboard = () => {
  const { subscriptions } = useSubscriptions();
  const [selectedTag, setSelectedTag] = useState("All");

  const uniqueTags = ["All", ...new Set(subscriptions.map((sub) => sub.tag))];

  const filteredSubs =
    selectedTag === "All"
      ? subscriptions
      : subscriptions.filter((sub) => sub.tag === selectedTag);

  const totalCost = filteredSubs.reduce(
    (sum, sub) => sum + parseFloat(sub.price),
    0
  );

  return (
    <div className="p-6 text-gray-800 bg-white dark:text-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Subscriptions</h1>
        <div className="flex gap-2">
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                selectedTag === tag
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-lg font-medium text-green-700 dark:text-green-300">
        💰 Total: ${totalCost.toFixed(2)}
      </div>

      {filteredSubs.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 text-gray-500 dark:text-gray-400">
          <img
            src="https://www.svgrepo.com/show/327388/no-data.svg"
            alt="No data"
            className="w-48 h-48 mb-4 opacity-80"
          />
          <p className="text-lg font-medium">No subscriptions found.</p>
          <p className="text-sm">Click “Add” in the navbar to start tracking!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubs.map((sub, index) => (
            <SubscriptionCard key={index} {...sub} />
          ))}
        </div>
      )}
      {filteredSubs.length > 0 && (
        <button
          onClick={() => exportSubscriptionsToCSV(filteredSubs)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
      )}
    </div>
  );
};

export default Dashboard;
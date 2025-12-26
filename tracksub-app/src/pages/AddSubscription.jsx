import { useState } from "react";
import { useSubscriptions } from "../context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddSubscription = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    nextBillingDate: "",
    tag: "",
  });
  const { addSubscription } = useSubscriptions();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const { user } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("User not logged in");
    console.log("User ID:", user.uid);
    // Don't include uid in the subscription data
    addSubscription(form);
    navigate("/dashboard");
  };

  return (
    <div className="p-7 overflow-hidden flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-md flex w-full max-w-4xl m-4 overflow-hidden border-4 border-gray-400 dark:bg-gray-900 dark:border-gray-700">
        {/* Left: Add Subscription Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <div className="font-bold text-xs text-cyan-600 mb-2">
              TrackSub.
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-black">Add New Subscription</h2>
            <p className="text-gray-600">
              Easily track your new subscription below
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name (e.g., Netflix)"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
            />
            <input
              type="date"
              name="nextBillingDate"
              value={form.nextBillingDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
            />
            <input
              type="text"
              name="tag"
              placeholder="Tag (e.g., Entertainment)"
              value={form.tag}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
            />
            <button
              type="submit"
              className="bg-cyan-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-cyan-700 transition"
            >
              Add Subscription
            </button>
          </form>
        </div>
        {/* Right: Illustration */}
        <div className="hidden md:flex flex-1 bg-gradient-to-tr from-cyan-500 to-blue-400">
          <img
            src="/addsubs.jpg"
            alt="Add Subscription illustration"
            className="w-full h-full object-cover dark:opacity-90 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
};

export default AddSubscription;

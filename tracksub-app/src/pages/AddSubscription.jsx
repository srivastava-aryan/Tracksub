import { useState } from "react";
import { useSubscriptions } from "../context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddSubscription = () => {
  const [form, setForm] = useState({ name: "", price: "", date: "", tag: "" });
  const { addSubscription } = useSubscriptions();
  const navigate = useNavigate();


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  
  const { user } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("User not logged in");
    addSubscription({ ...form, uid: user.uid });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Add New Subscription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name (e.g., Netflix)"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          name="tag"
          placeholder="Tag (e.g., Entertainment)"
          value={form.tag}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Subscription
        </button>
      </form>
    </div>
  );
};

export default AddSubscription;
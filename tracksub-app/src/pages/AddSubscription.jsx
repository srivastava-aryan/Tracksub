import { useState } from "react";
import { useSubscriptions } from "../context/SubscriptionContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddSubscription = () => {
  const [form, setForm] = useState({ name: "", price: "", nextBillingDate: "", tag: "" });
  const { addSubscription } = useSubscriptions();
  const navigate = useNavigate();


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  
  const { user } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("User not logged in");
    // console.log("User ID:", user.uid);
    addSubscription({ ...form, uid: user.uid });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-background text-foreground transition-colors overflow-hidden">
      <div className="max-w-md w-full p-6 bg-card text-card-foreground rounded-xl shadow-md border-4 border-cyan-500">
        <h2 className="text-xl font-bold mb-4">Add New Subscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name (e.g., Netflix)"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-background text-foreground border-border"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-background text-foreground border-border"
          />
          <input
            type="date"
            name="nextBillingDate"
            value={form.nextBillingDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded bg-background text-foreground border-border"
          />
          <input
            type="text"
            name="tag"
            placeholder="Tag (e.g., Entertainment)"
            value={form.tag}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-background text-foreground border-border"
          />
          <button
            type="submit"
            className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
          >
            Add Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;
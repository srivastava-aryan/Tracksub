import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

const SubscriptionContext = createContext();

export const useSubscriptions = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { user } = useAuth();

  const fetchSubscriptions = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`/subscriptions/${user.uid}`);
      console.log("Fetched subscriptions:", res.data);
      setSubscriptions(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const addSubscription = async (sub) => {
    if (!user) return;
    try {
      const res = await axios.post(`/subscriptions/${user.uid}`, sub);
      console.log("Created subscription:", res.data);
      setSubscriptions((prev) => [...prev, res.data]);
      console.log("Submitting this data:", sub);
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await axios.delete(`/subscriptions/${id}`);
      setSubscriptions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{ subscriptions, addSubscription, deleteSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
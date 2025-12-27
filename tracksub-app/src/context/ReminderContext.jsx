import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

const ReminderContext = createContext();

export const useReminders = () => useContext(ReminderContext);

export const ReminderProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    pushNotifications: false,
    emailNotifications: true,
    smsNotifications: false,
    reminderDays: "3",
    autoRenewWarning: true,
    priceChangeAlert: true,
    weeklyDigest: false,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSettings = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`/reminders/${user.uid}`);
      console.log("Fetched reminder settings:", res.data);
      setSettings(res.data);
    } catch (err) {
      console.error("Fetch settings error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    if (!user) return;
    try {
      const res = await axios.put(`/reminders/${user.uid}`, newSettings);
      console.log("Updated settings:", res.data);
      setSettings(res.data);
      return res.data;
    } catch (err) {
      console.error("Update settings error:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [user]);

  return (
    <ReminderContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </ReminderContext.Provider>
  );
};
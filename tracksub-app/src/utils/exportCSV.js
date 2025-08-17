import { saveAs } from "file-saver";
import Papa from "papaparse";

export const exportSubscriptionsToCSV = (data) => {
  if (!data || data.length === 0) {
    alert("No data to export.");
    return;
  }

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, "subscriptions.csv");
};
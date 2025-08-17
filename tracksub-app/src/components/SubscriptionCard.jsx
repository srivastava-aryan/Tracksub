const SubscriptionCard = ({ name, price, date, tag }) => {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-100 shadow-md p-4 rounded-xl border border-gray-200 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{name}</h2>
        <span className="text-sm text-blue-600 font-semibold">{tag}</span>
      </div>
      <p className="text-sm text-gray-600">Next Billing: {date}</p>
      <p className="text-xl font-bold text-green-600 mt-2">${price}</p>
    </div>
  );
};

export default SubscriptionCard;
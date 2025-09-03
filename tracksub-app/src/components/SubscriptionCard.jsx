const SubscriptionCard = ({ name, price, nextBillingDate, tag }) => {
  // Format date to mm/dd/yyyy
  let formattedDate = '';
  if (nextBillingDate) {
    const dateObj = new Date(nextBillingDate);
    if (!isNaN(dateObj)) {
      formattedDate = `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
    } else {
      formattedDate = nextBillingDate;
    }
  }
  return (
    <div className="bg-card text-card-foreground shadow-md p-4 rounded-xl border border-border hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{name}</h2>
        <span className="text-sm text-blue-600 font-semibold">{tag}</span>
      </div>
      <p className="text-sm text-muted-foreground">Next Billing: {formattedDate}</p>
      <p className="text-xl font-bold text-green-600 mt-2">${price}</p>
    </div>
  );
};

export default SubscriptionCard;
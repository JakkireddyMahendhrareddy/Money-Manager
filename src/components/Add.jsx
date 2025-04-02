import React from "react";

const Add = ({ transaction, onEdit, onDelete }) => {
  // Determine color based on transaction type
  const bgColor = transaction.type === "INCOME" ? "bg-green-100" : "bg-red-100";
  const textColor = transaction.type === "INCOME" ? "text-green-700" : "text-red-700";
  
  // Format the date and time to be more readable
  const formatDateTime = (dateString) => {
    if (!dateString) return "Unknown";
    
    try {
      const date = new Date(transaction.id); // Using id for timestamp if date doesn't work
      const formattedDate = date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      
      const formattedTime = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      return `${formattedDate} at ${formattedTime}`;
    } catch (e) {
      return dateString || "Unknown";
    }
  };

  return (
    <div className={`flex flex-col p-4 ${bgColor} rounded-md shadow-sm hover:shadow-md transition-all`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-gray-800">{transaction.title}</p>
          <p className={`font-medium ${textColor}`}>
            {transaction.type === "INCOME" ? "+" : "-"}
            ₹{transaction.amount.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onEdit(transaction)} 
            className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
          </button>
          <button 
            onClick={() => onDelete(transaction.id)} 
            className="p-1 text-red-600 hover:bg-red-100 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Display the date and time */}
      <div className="mt-2 text-xs text-gray-500 italic">
        {formatDateTime(transaction.date)}
      </div>
    </div>
  );
};

export default Add;
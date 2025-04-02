import Add from './Add';
import React, { useState } from "react";

const transactionTypeOptions = [
  { optionId: "INCOME", displayText: "Income" },
  { optionId: "EXPENSES", displayText: "Expenses" },
];

const TodoApp = () => {
  const [selectTitle, setSelectTitle] = useState("");
  const [selectAmount, setSelectAmount] = useState("");
  const [arr, setArr] = useState([]);
  const [selectType, setType] = useState(transactionTypeOptions[0].optionId);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const takeInput = (e) => {
    e.preventDefault();
    
    // Form validation
    if (selectTitle.trim() === "") {
      setError("Please enter a title");
      return;
    }
    
    if (selectAmount.trim() === "" || parseFloat(selectAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    
    setError("");

    const now = new Date();
    const timestamp = now.getTime();

    // Update existing transaction
    if (editId !== null) {
      const updatedTransactions = arr.map(item => 
        item.id === editId 
          ? { 
              ...item, 
              title: selectTitle, 
              amount: parseFloat(selectAmount), 
              type: selectType,
              lastUpdated: timestamp
            } 
          : item
      );
      setArr(updatedTransactions);
      setEditId(null);
    } else {
      // Add new transaction with current date and time
      const newData = {
        id: timestamp,
        title: selectTitle,
        amount: parseFloat(selectAmount),
        type: selectType,
        date: now.toISOString(),
        created: timestamp
      };
      setArr([...arr, newData]);
    }

    // Reset form
    setSelectTitle("");
    setSelectAmount("");
    setType(transactionTypeOptions[0].optionId);
  };

  const handleDelete = (id) => {
    setArr(arr.filter(item => item.id !== id));
  };

  const handleEdit = (transaction) => {
    setSelectTitle(transaction.title);
    setSelectAmount(transaction.amount.toString());
    setType(transaction.type);
    setEditId(transaction.id);
  };

  const getBalance = () => {
    return arr.reduce((acc, curr) => 
      curr.type === "INCOME" ? acc + curr.amount : acc - curr.amount, 0);
  };

  const getIncome = () => {
    return arr.filter(item => item.type === "INCOME")
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const getExpenses = () => {
    return arr.filter(item => item.type === "EXPENSES")
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  // Delete all transactions
  const handleDeleteAll = () => {
    setShowConfirmation(true);
  };

  const confirmDeleteAll = () => {
    setArr([]);
    setShowConfirmation(false);
  };

  const cancelDeleteAll = () => {
    setShowConfirmation(false);
  };

  // Sort transactions by most recent first
  const sortedTransactions = [...arr].sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-5">
      <div className="w-full max-w-2xl p-5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg text-center text-white shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Hi Mahendhra</h1>
        <p className="text-lg mt-1">Welcome back to your Money Manager</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl mb-8">
        <div className="p-5 bg-white text-gray-800 rounded-lg text-center shadow-md border-t-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-600">Your Balance</h2>
          <p className="text-2xl font-bold mt-2">₹{getBalance().toFixed(2)}</p>
        </div>
        <div className="p-5 bg-white text-gray-800 rounded-lg text-center shadow-md border-t-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-600">Your Income</h2>
          <p className="text-2xl font-bold mt-2 text-green-600">₹{getIncome().toFixed(2)}</p>
        </div>
        <div className="p-5 bg-white text-gray-800 rounded-lg text-center shadow-md border-t-4 border-red-500">
          <h2 className="text-lg font-semibold text-gray-600">Your Expenses</h2>
          <p className="text-2xl font-bold mt-2 text-red-600">₹{getExpenses().toFixed(2)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {editId ? "Update Transaction" : "Add Transaction"}
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={takeInput} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                placeholder="What was it for?" 
                value={selectTitle} 
                onChange={(e) => setSelectTitle(e.target.value)} 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Amount</label>
              <input 
                type="number" 
                placeholder="Amount in ₹" 
                value={selectAmount} 
                onChange={(e) => setSelectAmount(e.target.value)} 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Type</label>
              <select 
                value={selectType} 
                onChange={(e) => setType(e.target.value)} 
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {transactionTypeOptions.map(option => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {editId ? "Update" : "Add"} Transaction
            </button>
            
            {editId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditId(null);
                  setSelectTitle("");
                  setSelectAmount("");
                  setType(transactionTypeOptions[0].optionId);
                }} 
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
            {arr.length > 0 && (
              <button 
                onClick={handleDeleteAll}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                Delete All
              </button>
            )}
          </div>
          
          {/* Delete All Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4">
                <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
                <p className="mb-6">Are you sure you want to delete all transactions? This action cannot be undone.</p>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={cancelDeleteAll}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDeleteAll}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete All
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3 max-h-96 overflow-auto pr-1">
            {sortedTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-center">No transactions yet</p>
                <p className="text-gray-400 text-sm text-center mt-1">
                  Add your first transaction to start tracking
                </p>
              </div>
            ) : (
              sortedTransactions.map(transaction => (
                <Add
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
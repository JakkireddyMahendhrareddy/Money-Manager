import Add from "./Add";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const transactionTypeOptions = [
  { optionId: "INCOME", displayText: "Income" },
  { optionId: "EXPENSES", displayText: "Expenses" },
];

const MoneyManage = () => {
  const [selectTitle, setSelectTitle] = useState("");
  const [selectAmount, setSelectAmount] = useState("");
  const [arr, setArr] = useState([]);
  const [selectType, setType] = useState(transactionTypeOptions[0].optionId);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [greeting, setGreeting] = useState("sir");

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(arr);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, "transactions.xlsx");
  };

  // Rotate greeting every 2 seconds
  useEffect(() => {
    const greetings = ["sir", "mam"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % greetings.length;
      setGreeting(greetings[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
      const updatedTransactions = arr.map((item) =>
        item.id === editId
          ? {
              ...item,
              title: selectTitle,
              amount: parseFloat(selectAmount),
              type: selectType,
              lastUpdated: timestamp,
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
        created: timestamp,
      };
      setArr([...arr, newData]);
    }

    // Reset form
    setSelectTitle("");
    setSelectAmount("");
    setType(transactionTypeOptions[0].optionId);
  };

  const handleDelete = (id) => {
    setArr(arr.filter((item) => item.id !== id));
  };

  const handleEdit = (transaction) => {
    setSelectTitle(transaction.title);
    setSelectAmount(transaction.amount.toString());
    setType(transaction.type);
    setEditId(transaction.id);
  };

  const getBalance = () => {
    return arr.reduce(
      (acc, curr) =>
        curr.type === "INCOME" ? acc + curr.amount : acc - curr.amount,
      0
    );
  };

  const getIncome = () => {
    return arr
      .filter((item) => item.type === "INCOME")
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const getExpenses = () => {
    return arr
      .filter((item) => item.type === "EXPENSES")
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  // Show confirmation modal
  const handleDeleteAll = () => {
    if (arr.length === 0) return; // No need to show if there's nothing to delete
    setShowConfirmation(true);
  };

  // Confirm delete
  const confirmDeleteAll = () => {
    setArr([]);
    setShowConfirmation(false);
  };

  // Cancel delete
  const cancelDeleteAll = () => {
    setShowConfirmation(false);
  };

  // Sort transactions by most recent first
  const sortedTransactions = [...arr].sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <div className="w-full max-w-2xl p-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl text-center text-white shadow-xl mb-8 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold">Hi {greeting}</h1>
        <p className="text-xl mt-2 font-light">
          Welcome back to your Money Manager
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-8">
        <div className="p-6 bg-white text-gray-800 rounded-xl text-center shadow-lg border-t-4 border-blue-500 transform hover:translate-y-1 transition-transform duration-300">
          <h2 className="text-lg font-semibold text-gray-600">Your Balance</h2>
          <p
            className={`text-3xl font-bold mt-3 ${
              getBalance() >= 0 ? "text-blue-600" : "text-red-600"
            }`}
          >
            ₹{getBalance().toFixed(2)}
          </p>
        </div>
        <div className="p-6 bg-white text-gray-800 rounded-xl text-center shadow-lg border-t-4 border-green-500 transform hover:translate-y-1 transition-transform duration-300">
          <h2 className="text-lg font-semibold text-gray-600">Your Income</h2>
          <p className="text-3xl font-bold mt-3 text-green-600">
            ₹{getIncome().toFixed(2)}
          </p>
        </div>
        <div className="p-6 bg-white text-gray-800 rounded-xl text-center shadow-lg border-t-4 border-red-500 transform hover:translate-y-1 transition-transform duration-300">
          <h2 className="text-lg font-semibold text-gray-600">Your Expenses</h2>
          <p className="text-3xl font-bold mt-3 text-red-600">
            ₹{getExpenses().toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            {editId ? "Update Transaction" : "Add Transaction"}
          </h2>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          <form onSubmit={takeInput} className="space-y-5">
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-medium">Title</label>
              <input
                type="text"
                placeholder="What was it for?"
                value={selectTitle}
                onChange={(e) => setSelectTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-medium">Amount</label>
              <input
                type="number"
                placeholder="Amount in ₹"
                value={selectAmount}
                onChange={(e) => setSelectAmount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-2 font-medium">Type</label>
              <select
                value={selectType}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white transition-all"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem top 50%",
                  backgroundSize: "0.65rem auto",
                  paddingRight: "2.5rem",
                }}
              >
                {transactionTypeOptions.map((option) => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-md hover:shadow-lg transform hover:translate-y-0.5 transition-all duration-200"
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
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg max-w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 border-b pb-2">
              Transaction History
            </h2>

            {arr.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {/* Export Button */}
                <button
                  onClick={handleExportToExcel}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12"
                    />
                  </svg>
                  Export XLS
                </button>

                {/* Delete All Button */}
                <button
                  onClick={handleDeleteAll}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center justify-center shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mr-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                  Delete All
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3 max-h-[26rem] overflow-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {sortedTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 sm:p-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500 text-center font-medium">
                  No transactions yet
                </p>
                <p className="text-gray-400 text-sm text-center mt-2">
                  Add your first transaction to start tracking
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {sortedTransactions.map((transaction) => (
                  <Add
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-4 w-80">
              <h2 className="text-lg font-semibold">Are you sure?</h2>
              <p className="text-sm text-gray-600">
                This will delete all transactions permanently.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDeleteAll}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Yes, Delete All
                </button>
                <button
                  onClick={cancelDeleteAll}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyManage;

import Add from "./Add";

import { useState } from "react";

const TodoApp = () => {
  const [selectName, setSelectName] = useState("");
  const [selectText, setSelectText] = useState("");
  const [arr, setArr] = useState([]);
  const [type, setType] = useState("income");


  const takeInput = (e) => {
    e.preventDefault();

    console.log(selectName);
    console.log(selectText);

    if (selectName.trim() === "" || selectText.trim() === "") {
      alert("please fill the all the feilds");
    }

    const newData = {
      id: arr.length + 1,
      name: selectName,
      text: selectText,
    };

    setArr([...arr, newData]);
    setSelectName("");
    setSelectText("");
  };
  console.log(arr);

  return (
    <div className="flex flex-col justify-start items-center h-screen bg-gray-200 pt-5">
      <div className="flex flex-col justify-start  p-5 items-start text-bold bg-blue-200 rounded-lg w-1/2">
        <h1 className="text-xl">Hi Mahendhra</h1>
        <p className="text-sm">welcome back to your Money Manager</p>
      </div>
      <div className="flex flex-row justify-around items-start space-x-5 pt-3">
        <div className="flex flex-col justify-start  p-5 items-center text-bold bg-blue-500 rounded-lg w-40">
          <h1 className="text-lg">Your Balance</h1>
          <p className="text-sm">0</p>
        </div>
        <div className="flex flex-col justify-start  p-5 items-center text-bold bg-blue-500 rounded-lg w-40">
          <h1 className="text-lg">Your Income</h1>
          <p className="text-sm">0</p>
        </div>
        <div className="flex flex-col justify-start  p-5 items-center text-bold bg-blue-500 rounded-lg w-40">
          <h1 className="text-lg">Your Expenses</h1>
          <p className="text-sm">0</p>
        </div>
      </div>
      <div className="flex flex-row justify-start  items-start  space-x-5 pt-5 ">
        <div className="border-2 rounded-lg h-70 w-70 pt-5 ">
          <h1 className="text-xl">Add Transcation</h1>
          <form
            onSubmit={takeInput}
            className="space-y-1 flex flex-col justify-start ml-3 items-start mb-3"
          >
            <label htmlFor="text">Title</label>
            <input
              type="text"
              value={selectName}
              placeholder="Your Name .."
              onChange={(e) => setSelectName(e.target.value)}
              className="border-2"
            />
            <label htmlFor="text">Amount</label>
            <input
              type="text"
              value={selectName}
              placeholder="Your Name .."
              onChange={(e) => setSelectName(e.target.value)}
              className="border-2"
            />
            <label htmlFor="text">Type</label>
            <select value={type} onChange={(e)=>setAmount(e.target.value)} className="border-2">
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>


            </select>
            <button className="bg-blue-400 border-2 py-1 rounded-lg px-2 cursor-pointer" type="submit">Add</button>
          </form>
        </div>
        <div className="border-2 rounded-lg h-70 w-70 pt-5 ">
          <h1 className="text-xl">Add Transcation</h1>
          <form
            onSubmit={takeInput}
            className="space-y-1 flex flex-col justify-start ml-3 items-start mb-3"
          >
            <label htmlFor="text">Title</label>
            <input
              type="text"
              value={selectName}
              placeholder="Your Name .."
              onChange={(e) => setSelectName(e.target.value)}
              className="border-2"
            />
            <label htmlFor="text">Title</label>
            <input
              type="text"
              value={selectName}
              placeholder="Your Name .."
              onChange={(e) => setSelectName(e.target.value)}
              className="border-2"
            />
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default TodoApp;

{
  /* <hr className="border-2 border-red-400 w-full mb-3" />
      <ul className="flex flex-col">
        {arr.map((each) => (
          <Add key={each.id} res={each} />
        ))}
      </ul> */
}

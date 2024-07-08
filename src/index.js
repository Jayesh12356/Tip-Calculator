import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  function onBillEnter(amount) {
    setBill(amount);
  }

  const [mypercentage, setmyPercentage] = useState(0);
  function onmyPercentageEnter(perc) {
    setmyPercentage(perc);
  }

  const [friendpercentage, setfriendPercentage] = useState(0);
  function onfriendPercentageEnter(perc) {
    setfriendPercentage(perc);
  }

  let avarage = (Number(mypercentage) + Number(friendpercentage)) / 2;
  console.log("avarage", avarage);
  let tip = (Number(bill) * avarage) / 100;
  console.log("tip", tip);

  function resetAll() {
    setBill("");
    setmyPercentage(0);
    setfriendPercentage(0);
  }
  const summarystatus = bill || mypercentage || friendpercentage ? true : false;
  return (
    <div className="container">
      <BillEntry onBillEnter={onBillEnter} bill={bill} />
      <ServiceRating
        onPercentageEnter={onmyPercentageEnter}
        percentage={mypercentage}
      >
        <span>How did you like the service?</span>
      </ServiceRating>

      <ServiceRating
        onPercentageEnter={onfriendPercentageEnter}
        percentage={friendpercentage}
      >
        <span>How did your friend like the service?</span>
      </ServiceRating>
      {summarystatus && (
        <Summary bill={Number(bill)} tip={tip} resetAll={resetAll} />
      )}
    </div>
  );
}

function BillEntry({ onBillEnter, bill }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="text"
        placeholder="amount..."
        value={bill}
        onChange={(e) => onBillEnter(e.target.value)}
      />
    </div>
  );
}

function ServiceRating({ children, onPercentageEnter, percentage }) {
  return (
    <div>
      {children}
      <select
        value={percentage}
        onChange={(e) => onPercentageEnter(e.target.value)}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Summary({ bill, tip, resetAll }) {
  return (
    <div>
      <h2>
        You pay {bill + tip}₹ ({bill}₹ + {tip}₹ tip)
      </h2>
      <button onClick={resetAll}>Reset</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

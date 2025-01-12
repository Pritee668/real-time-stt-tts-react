import React from "react";

function HistoryList({ history }) {
  return (
    <div className="history">
      <h3>Voice History</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;
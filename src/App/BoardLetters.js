import React from "react";
const Letters = () => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  return (
    <div className="letters-collumn">
      {letters.map((col, colIndex) => {
        return (
          <div className="cell-text" key={`${colIndex}`}>
            {col}
          </div>
        );
      })}
    </div>
  );
};
export default Letters;

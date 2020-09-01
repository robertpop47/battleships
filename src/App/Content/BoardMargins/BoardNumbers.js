import React from "react";
const Numbers = () => {
  const numbers = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="numbers-row">
      {numbers.map((row, rowIndex) => {
        return (
          <div className="cell-text" key={`${rowIndex}`}>
            {row}
          </div>
        );
      })}
    </div>
  );
};
export default Numbers;

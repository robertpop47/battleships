import React from "react";
import { Provider } from "react-redux";
import store from "./stores";
import { Ships } from "./Ships";
import { Board } from "./Board";

const App = () => {
  return (
    <Provider store={store}>
      {/* <div>
        <h1>Hello React</h1>
      </div> */}
      <Ships></Ships>
      <Board></Board>
    </Provider>
  );
};

export default App;

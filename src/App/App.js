import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import battleship from "./reducers";
import Footer from "./Footer";
import Header from "./Header";
import Board from "./Board";
import store from "./stores";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Board />
      <Footer />
    </Provider>
  );
};

export default App;

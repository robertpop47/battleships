import React from "react";
import { Provider } from "react-redux";

import store from "../redux/stores";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Content />
      <Footer />
    </Provider>
  );
};

export default App;

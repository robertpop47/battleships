import { createStore } from "redux";
import battleship from "./reducers";

const store = createStore(
  battleship,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

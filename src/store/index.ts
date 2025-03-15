import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { serviceReducer } from "./serviceReducer";

export const rootReducer = combineReducers({
  service: serviceReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export default createStore;

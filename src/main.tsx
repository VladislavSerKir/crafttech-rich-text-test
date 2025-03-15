import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/styles.scss";
import App from "./App.tsx";
import { Provider } from "react-redux";
import createStore from "./store/index.ts";

const store = createStore();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);

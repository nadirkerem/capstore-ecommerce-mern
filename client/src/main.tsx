import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { store } from "./app/store.ts";
import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-right" />
  </Provider>,
);

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { store } from "./app/store.ts";
import { Provider } from "react-redux";

import ThemedToastContainer from "./components/ThemedToastContainer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <ThemedToastContainer />
  </Provider>,
);

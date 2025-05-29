import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store.ts";
import { ToastContainer } from "react-toastify";

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  </>
);

import { createRoot } from "react-dom/client";

import App from "./App/App.jsx";
import "./style/index.css";
import "./style/form.css";
import "./style/scrollbar.css";
import "./style/colors.css";
import { DarkModeProvider } from "./context/useDarkModeToggle";

import { Provider } from "react-redux";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </Provider>,
);

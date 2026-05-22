import { createRoot } from "react-dom/client";

import App from "./App/App.jsx";
import "./style/index.css";
import "./style/form.css";
import "./style/scrollbar.css";
import "./style/colors.css";

import { ThemeModeProvider } from "./context/useThemeMode.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeModeProvider>
      <App />
    </ThemeModeProvider>
  </Provider>,
);

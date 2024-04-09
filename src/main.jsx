import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { HomeProvider } from "./contexts/HomeContext.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx";
import { SettingsProvider } from "./contexts/SettingsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AllContexts>
        <App />
      </AllContexts>
    </BrowserRouter>
  </React.StrictMode>
);

function AllContexts({ children }) {
  return (
    <>
      <HomeProvider>
        <AuthProvider>
          <SettingsProvider>
            <SearchProvider>{children}</SearchProvider>
          </SettingsProvider>
        </AuthProvider>
      </HomeProvider>
    </>
  );
}

export default AllContexts;

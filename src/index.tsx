import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./auth/auth.context";
import SignUp from "./pages/signup";
import AuthGuard from "./auth/AuthGuard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <AuthGuard>
                <App />
              </AuthGuard>
            }
          />
        </Routes>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);

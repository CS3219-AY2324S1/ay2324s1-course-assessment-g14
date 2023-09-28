import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./auth/auth.context";
import App from "./pages/App";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import AuthGuard from "./auth/AuthGuard";
import { DataContextProvider } from "./data/data.context";
import ProblemSolver from "./pages/ProblemSolver";
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <DataContextProvider>
          <Routes>
            <Route path="/" element={<App />} />
            {/* <Route path="/question/" element={<App />} /> */}
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
              <Route
              path="/question/:questionId"
              element={
                <AuthGuard>
                  <Navbar />
                  <ProblemSolver />
                </AuthGuard>
              }
              />
          </Routes>

        </DataContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);

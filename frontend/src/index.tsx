import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./auth/auth.context";
import App from "./pages/App";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import AuthGuard from "./auth/AuthGuard";
import AdminAuthGuard from "./auth/AdminAuthGuard";
import RedirectIfLoggedIn from "./auth/RedirectIfLoggedIn";
import { DataContextProvider } from "./data/data.context";
import CollabProblemSolver from "./pages/CollabProblemSolver";
import ProblemSolver from "./pages/ProblemSolver";

import Landing from "./pages/landing";
import Profile from "./pages/profile";
import CreateAdmin from "./pages/createAdmin";
import MaintainerGuard from "./auth/MaintainerGuard";
import QuestionsManage from "./pages/QuestionsManage";
import QuestionsView from "./pages/QuestionsView";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      {/* <AuthContextProvider> */}
        <DataContextProvider>
         
                  <App />
            
        </DataContextProvider>
      {/* </AuthContextProvider> */}
    </Router>
  </React.StrictMode>
);

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

import ProblemSolver from "./pages/ProblemSolver";

import Landing from "./pages/landing";
import Profile from "./pages/profile";
import QuestionsManage from "./pages/QuestionsManage";
import QuestionsView from "./pages/QuestionsView";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <DataContextProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route
              path="/login"
              element={
                <RedirectIfLoggedIn>
                  <Login />
                </RedirectIfLoggedIn>
              }
            />
            <Route
              path="/signup"
              element={
                <RedirectIfLoggedIn>
                  <SignUp />
                </RedirectIfLoggedIn>
              }
            />
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
                  <ProblemSolver />
                </AuthGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              }
            />
            <Route
              path="/view-questions"
              element={
                <AuthGuard>
                  <QuestionsView />
                </AuthGuard>
              }
            />
            <Route
              path="/manage-questions"
              element={
                <AdminAuthGuard>
                  <QuestionsManage />
                </AdminAuthGuard>
              }
            />
          </Routes>
        </DataContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);

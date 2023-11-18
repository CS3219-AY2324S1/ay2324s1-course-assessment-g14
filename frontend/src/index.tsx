import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./auth/auth.context";
import App from "./pages/App";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import AuthGuard from "./auth/AuthGuard";
import AdminGuard from "./auth/AdminGuard";
import RedirectIfLoggedIn from "./auth/RedirectIfLoggedIn";
import { DataContextProvider } from "./data/data.context";
import CollabProblemSolver from "./pages/CollabProblemSolver";
import ProblemSolver from "./pages/ProblemSolver";

import Landing from "./pages/landing";
import Profile from "./pages/profile";
import CreateAdmin from "./pages/createAdmin";
import MasterGuard from "./auth/MasterGuard";
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
              path="/collab/question/:questionId/:user1/:user2"
              element={
                <AuthGuard>
                  <CollabProblemSolver />
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
              path="/createadmin"
              element={
                <MasterGuard>
                  <CreateAdmin />
                </MasterGuard>
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
                <AdminGuard>
                  <QuestionsManage />
                </AdminGuard>
              }
            />
          </Routes>
        </DataContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);

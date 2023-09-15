import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Home/>
    </div>
  );
}

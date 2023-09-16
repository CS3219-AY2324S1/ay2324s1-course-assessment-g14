import React from "react";
import { Container, Stack } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import './App.css';
import Titlebar from "./components/Questions/Titlebar";

export default function App() {
  return (
    <>
    <Stack gap={5}>
      <Navbar />
      <Titlebar />
      <Home/>
      <Container>hello world!</Container>
    </Stack>
    </>
  );
}

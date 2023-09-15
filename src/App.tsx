import React from "react";
import { Container, Stack } from "@mui/material";
import Navbar from "./components/Navbar";
import Titlebar from "./components/Questions/Titlebar";

export default function App() {
  return (
    <>
    <Stack gap={5}>
      <Navbar />
      <Titlebar />
      <Container>hello world!</Container>
    </Stack>
    </>
  );
}

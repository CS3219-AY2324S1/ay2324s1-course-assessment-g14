import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import "./App.css";
import Titlebar from "../components/Questions/Titlebar";
import CenteredContainer from "../components/CenteredContainer";
import ProblemSolver from "../components/ProblemSolver";

const appStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // Make the container at least 100vh in height
};

export default function App() {
  return (
    <Box style={appStyle}>
      <CssBaseline />
      <Navbar />
      <ProblemSolver style={{ flex: "1" }} />
    </Box>
  );
}
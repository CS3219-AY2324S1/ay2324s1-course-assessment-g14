import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import "./App.css";
import Titlebar from "../components/Questions/Titlebar";
import CenteredContainer from "../components/CenteredContainer";
import ProblemSolver from "../components/ProblemSolver";

export default function App() {
  return (
    <Box>
      {/* <CssBaseline /> */}
      <Navbar />
      <ProblemSolver /> 
      {/* <CenteredContainer>
        <Home />
        <Titlebar />
      </CenteredContainer> */}
    </Box>
  );
}

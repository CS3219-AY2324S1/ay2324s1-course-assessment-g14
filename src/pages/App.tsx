import { Box, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import "./App.css";
import Titlebar from "../components/Questions/QuestionsTable";
import CenteredContainer from "../components/CenteredContainer";
import ProblemSolver from "./ProblemSolver";
import QuestionsTable from "../components/Questions/QuestionsTable";

export default function App() {
  return (
    <Box>
      <CssBaseline />
      <Navbar />    
      {/* <ProblemSolver />  */}
      <CenteredContainer>
        <Home />
        <QuestionsTable />
      </CenteredContainer>
    </Box>
  );
}

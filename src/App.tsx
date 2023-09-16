import { Box, Container, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Box>
      <CssBaseline />
      <Navbar />
      <Container>hello world!</Container>
    </Box>
  );
}

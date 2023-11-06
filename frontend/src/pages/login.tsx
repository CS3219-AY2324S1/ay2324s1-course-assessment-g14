import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Collapse,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import CenteredContainer from "../components/CenteredContainer";
import Navbar from "../components/Navbar";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../auth/auth.context";
import { useLocation } from "react-router-dom";

export default function Login() {
  const { error, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  const [show, setShow] = useState(true);

  const handleClickLogin = () => login(email, password);

  return (
    <Box height="100vh">
      {state?.showAlert && (
        <Collapse in={show}>
          <Alert onClose={() => setShow(false)} severity="warning">
            You are not logged in. Please log in to continue.
          </Alert>
        </Collapse>
      )}
      <CssBaseline />
      <Navbar />
      <CenteredContainer>
        <Typography variant="h4" align="center" paddingBottom={5}>
          Log In
        </Typography>
        <TextField
          sx={{ width: "25ch" }}
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordField password={password} setPassword={setPassword} />
        <Button variant="contained" onClick={handleClickLogin}>
          Login
        </Button>
        {error && <Typography>{error}</Typography>}
      </CenteredContainer>
    </Box>
  );
}

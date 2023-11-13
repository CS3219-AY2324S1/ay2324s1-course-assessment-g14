import { useState } from "react";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import CenteredContainer from "../components/CenteredContainer";
import Navbar from "../components/Navbar";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../auth/auth.context";

export default function CreateAdmin() {
  const { error, signUpAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creation, setCreation] = useState(false);

  const handleClickSignUp = async () => {
    await signUpAdmin(email, password);
    setCreation(true);
  };
  return (
    <Box height="100vh">
      <CssBaseline />
      <Navbar />
      <CenteredContainer>
        <Typography variant="h4" align="center" paddingBottom={5}>
          Create Admin User
        </Typography>
        <TextField
          sx={{ width: "25ch" }}
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordField password={password} setPassword={setPassword} />
        <Button variant="contained" onClick={handleClickSignUp}>
          Create
        </Button>
        {error && <Typography>{error}</Typography>}
        {creation && <Typography>Admin account created!</Typography>}
      </CenteredContainer>
    </Box>
  );
}

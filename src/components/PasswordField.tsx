import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordFieldProps {
  password: string;
  setPassword: (password: string) => void;
}

export default function PasswordField({
  password,
  setPassword,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
    </FormControl>
  );
}

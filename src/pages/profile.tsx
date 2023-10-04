import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import Navbar from "../components/Navbar";
import ProfileField from "../components/ProfileField";
import { useAuth } from "../auth/auth.context";
import { Values } from "../components/DropDownOrTextField";

export default function Profile() {
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState<Values>({
    email: user?.email ? user?.email : "",
    name: user?.displayName ? user?.displayName : "",
    year: "",
    major: "",
  });

  const profileFields = [
    { title: "Email", data: "email" },
    { title: "Display Name", data: "name" },
    { title: "Year of Study", data: "year" },
    { title: "Major", data: "major" },
  ];

  const toggleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    console.log(user);
  });

  return (
    <Box height="100vh">
      <CssBaseline />
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Avatar sx={{ height: 192, width: 192, mb: 2 }}>R</Avatar>
            <Chip label="Verified User" color="primary" />
          </Grid>
          <Grid item xs={9}>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Button
                variant="contained"
                onClick={toggleEdit}
                color={edit ? "success" : "primary"}
              >
                {edit ? "Save Details" : "Edit Details"}
              </Button>
            </Box>
            {profileFields.map((field) => (
              <ProfileField
                title={field.title}
                data={field.data}
                edit={edit}
                value={value}
                setValue={setValue}
              />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

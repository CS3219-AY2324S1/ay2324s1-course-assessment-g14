import { Dispatch, SetStateAction } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DropDownOrTextField, Values } from "./DropDownOrTextField";

interface ProfileFieldProps {
  title: string;
  data: string;
  edit: boolean;
  value: Values;
  setValue: Dispatch<SetStateAction<Values>>;
}

export default function ProfileField({
  title,
  data,
  edit,
  value,
  setValue,
}: ProfileFieldProps) {
  return (
    <Box my={1}>
      {edit ? (
        <DropDownOrTextField
          title={title}
          data={data}
          value={value}
          setValue={setValue}
        />
      ) : (
        <Grid container>
          <Grid item xs={3}>
            <Typography fontWeight={600}>{title}:</Typography>
          </Grid>
          <Grid item xs={9}>
            {value[data]}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

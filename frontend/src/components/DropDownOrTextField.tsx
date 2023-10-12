import { Dispatch, SetStateAction } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export interface Values {
  [key: string]: string;
}

interface DropDownOrTextFieldProps {
  title: string;
  data: string;
  value: Values;
  setValue: Dispatch<SetStateAction<Values>>;
}

interface DropDownValues {
  [key: string]: string[];
}

export function DropDownOrTextField({
  title,
  data,
  value,
  setValue,
}: DropDownOrTextFieldProps) {
  const dropdowns = ["Year of Study", "Major"];
  const dropDownValues: DropDownValues = {
    "Year of Study": ["1", "2", "3", "4", ">5", "-"],
    Major: [
      "Computer Science",
      "Business Analytics",
      "Information Systems",
      "Data Science",
      "-"
    ],
  };

  return (
    <>
      {dropdowns.includes(title) ? (
        <FormControl sx={{ width: "23.5ch" }}>
          <InputLabel id="demo-simple-select-label">{title}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value[data]}
            label={title}
            onChange={(e) => setValue({ ...value, [data]: e.target.value })}
          >
            {dropDownValues[title].map((val: string) => (
              <MenuItem value={val}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField label={title}
        variant="outlined" 
        value={value[data]}
        disabled={title == "Email"} // Users cannot edit their email
        onChange={(e) => {
          setValue({ ...value, [data]: e.target.value })}
        } />
      )}
    </>
  );
}

"use client";
import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";

const departments = [
  { id: 1, name: "Sales" },
  { id: 2, name: "HR" },
  { id: 3, name: "Engineering" },
];

type Props = {
  initialValue: { id: number; name: string };
};

export const DepartmentSelect = ({ initialValue }: Props) => {
  const [selected, setSelected] = useState<number>(initialValue.id);

  const handleDepartmentChange = (event: SelectChangeEvent<number>) => {
    setSelected(Number(event.target.value));
  };

  const hasDeparmentChanged = selected !== initialValue.id;

  return (
    <Box width="fit-content" minWidth={240}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          labelId="department-label"
          value={selected}
          label="Department"
          onChange={handleDepartmentChange}
        >
          {departments.map((department) => (
            <MenuItem key={department.id} value={department.id}>
              {department.name}
            </MenuItem>
          ))}
        </Select>

        <Button
          size="small"
          variant="contained"
          color="secondary"
          disabled={!hasDeparmentChanged}
          sx={{ mt: 1 }}
        >
          Update
        </Button>
      </FormControl>
    </Box>
  );
};

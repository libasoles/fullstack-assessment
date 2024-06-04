"use client";
import { useUpdateEmployee } from "@/api/updateDepartment";
import { Employee } from "@/app/types/Employee";
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
  employee: Employee;
};

export const DepartmentSelect = ({ employee }: Props) => {
  const initialValue = employee.department.id;
  const [selected, setSelected] = useState<number>(initialValue);

  const { mutate, isPending, isError } = useUpdateEmployee();

  const handleDepartmentChange = (event: SelectChangeEvent<number>) => {
    setSelected(Number(event.target.value));
  };

  const handleUpdate = () => {
    const updatedEmployee = { id: employee.id, department: { id: selected } };
    mutate(updatedEmployee);
  };

  const hasDeparmentChanged = selected !== initialValue;
  const isButtonEnabled = hasDeparmentChanged && !isPending && !isError;

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
          disabled={!isButtonEnabled}
          sx={{ mt: 1 }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </FormControl>
    </Box>
  );
};

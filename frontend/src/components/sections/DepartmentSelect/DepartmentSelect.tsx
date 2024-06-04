"use client";
import { useFetchDepartments } from "@/api/fetchDepartments";
import { Employee } from "@/app/types/Employee";
import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import UpdateButton from "./UpdateButton";

type Props = {
  employee: Employee;
};

export const DepartmentSelect = ({ employee }: Props) => {
  const initialValue = employee.department.id;
  const [selected, setSelected] = useState<number>(initialValue);

  const { data: departments, isLoading, isError } = useFetchDepartments();

  const handleDepartmentChange = (event: SelectChangeEvent<number>) => {
    setSelected(Number(event.target.value));
  };

  if (isLoading || isError || !departments) return null;

  const hasDeparmentChanged = selected !== initialValue;

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

        <UpdateButton
          employee={employee}
          isEnabled={hasDeparmentChanged}
          departmentId={selected}
        />
      </FormControl>
    </Box>
  );
};

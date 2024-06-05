"use client";
import { useFetchDepartments } from "@/api/fetchDepartments";
import { SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";

type Props = {
  initialValue?: number;
};

export const DepartmentsSelect = ({ initialValue }: Props) => {
  const [selected, setSelected] = useState<number | "">(initialValue || "");

  const { data: departments, isLoading, isError } = useFetchDepartments();

  const handleDepartmentChange = (event: SelectChangeEvent<number>) => {
    setSelected(Number(event.target.value));
  };

  if (isLoading || isError || !departments) return null;

  return (
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
    </FormControl>
  );
};

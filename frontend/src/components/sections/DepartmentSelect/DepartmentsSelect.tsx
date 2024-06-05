"use client";

import { useFetchDepartments } from "@/api/fetchDepartments";
import { Department } from "@/types/Department";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { ReactNode } from "react";

type Props = {
  value?: number | "";
  onChange: (value: Department) => void;
} & SelectProps<number>;

export const DepartmentsSelect = ({
  name,
  value,
  onChange,
  ...rest
}: Props) => {
  const { data: departments, isLoading, isError } = useFetchDepartments();

  if (isLoading || isError || !departments) return null;

  const handleChange = (event: SelectChangeEvent<number>, child: ReactNode) => {
    const department = departments.find(
      (department) => department.id === Number(event.target.value)
    );

    if (department) onChange(department);
  };

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="department-label">Department</InputLabel>
      <Select
        labelId="department-label"
        label="Department"
        name={name}
        value={value}
        onChange={handleChange}
        {...rest}
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

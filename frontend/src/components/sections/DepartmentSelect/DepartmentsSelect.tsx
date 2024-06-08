"use client";

import { useFetchDepartments } from "@/api/useFetchDepartments";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { ReactNode } from "react";

type Props = {
  value?: DTO.Department["id"];
  onChange: (value: DTO.Department) => void;
  helperText?: string;
} & Omit<SelectProps<number>, "onChange" | "value">;

export const DepartmentsSelect = ({
  name,
  value,
  onChange,
  helperText,
  error,
  ...rest
}: Props) => {
  const { data: departments, isLoading, isError } = useFetchDepartments();

  if (isLoading || isError || !departments) return null;

  const handleChange = (
    event: SelectChangeEvent<DTO.Department["id"]>,
    child: ReactNode
  ) => {
    const department = departments.find(
      (department) => Number(department.id) === Number(event.target.value)
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
        error={error}
        {...rest}
      >
        {departments.map((department: DTO.Department) => (
          <MenuItem key={department.id} value={department.id}>
            {department.name}
          </MenuItem>
        ))}
      </Select>
      {error && helperText && (
        <FormHelperText error component="div">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

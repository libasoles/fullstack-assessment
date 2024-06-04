"use client";
import { useFetchEmployees } from "@/api/fetchEmployees";
import EmployeeCard from "@/components/EmployeeCard";
import Stack from "@mui/material/Stack";

const EmployeesList = () => {
  const { data, isLoading, error } = useFetchEmployees();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack gap={2}>
      {data?.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </Stack>
  );
};

export default EmployeesList;
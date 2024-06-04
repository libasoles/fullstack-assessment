"use client";
import { useFetchEmployees } from "@/api/fetchEmployees";
import Loading from "@/components/Loading";
import Stack from "@mui/material/Stack";
import EmployeeCard from "./EmployeeCard";

const EmployeesList = () => {
  const { data, isLoading, error } = useFetchEmployees();

  if (isLoading) return <Loading />;

  return (
    <Stack gap={2}>
      {data?.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </Stack>
  );
};

export default EmployeesList;

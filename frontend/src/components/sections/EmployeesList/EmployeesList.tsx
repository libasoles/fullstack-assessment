"use client";

import { useFetchEmployees } from "@/api/useFetchEmployees";
import Loading from "@/components/generic/Loading";
import NoContent from "@/components/generic/NoContent";
import Stack from "@mui/material/Stack";
import EmployeeCard from "./EmployeeCard";

const EmployeesList = () => {
  const { data, isLoading, isError } = useFetchEmployees();

  if (isLoading) return <Loading />;

  if (isError || !data)
    return (
      <NoContent
        variant="error"
        message="We couldn't retrieve the list of users. Try loading the page again in a few seconds."
      />
    );

  if (data?.length === 0) return <NoContent message="No employees found" />;

  return (
    <Stack gap={2}>
      {data?.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </Stack>
  );
};

export default EmployeesList;

"use client";

import { useFetchEmployees } from "@/api/useFetchEmployees";
import Loading from "@/components/generic/Loading";
import NoContent from "@/components/generic/NoContent";
import Stack from "@mui/material/Stack";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeesList = () => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const employeesQuery = useFetchEmployees();

  const virtualizedList = useVirtualizer({
    count: employeesQuery.data?.length || 0,
    getScrollElement: () => listRef.current,
    estimateSize: () => 150, // estimate card height
  });

  return (
    <div ref={listRef}>
      <Stack gap={2}>
        <Content
          employeesQuery={employeesQuery}
          virtualizedList={virtualizedList}
        />
      </Stack>
    </div>
  );
};

type ContentProps = {
  employeesQuery: ReturnType<typeof useFetchEmployees>;
  virtualizedList: ReturnType<typeof useVirtualizer<HTMLDivElement, Element>>;
};

const Content = ({ employeesQuery, virtualizedList }: ContentProps) => {
  const { data: employees, isLoading, isError } = employeesQuery;

  if (isLoading) return <Loading />;

  if (isError || !employees)
    return (
      <NoContent
        variant="error"
        message="We couldn't retrieve the list of users. Either create one, or try loading the page again in a few seconds."
      />
    );

  if (employees.length === 0) return <NoContent message="No employees found" />;

  return (
    <div
      style={{
        height: virtualizedList.getTotalSize(),
        width: "100%",
        position: "relative",
      }}
    >
      {virtualizedList.getVirtualItems().map((virtualRow) => (
        <div
          key={virtualRow.key}
          ref={virtualizedList.measureElement}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${virtualRow.start}px)`,
          }}
        >
          <EmployeeCard employee={employees[virtualRow.index]} />
        </div>
      ))}
    </div>
  );
};

export default EmployeesList;

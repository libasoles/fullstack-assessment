"use client";

import { useFetchEmployees } from "@/api/useFetchEmployees";
import Loading from "@/components/generic/Loading";
import NoContent from "@/components/generic/NoContent";
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
    <div
      ref={listRef}
      style={{ height: "90vh", overflow: "auto" }}
      data-testid="virtual-list"
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          height: `${virtualizedList.getTotalSize()}px`,
        }}
      >
        <Content
          employeesQuery={employeesQuery}
          virtualizedList={virtualizedList}
        />
      </div>
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
    <>
      {virtualizedList.getVirtualItems().map((virtualRow) => (
        <div
          key={virtualRow.key}
          ref={virtualizedList.measureElement}
          data-index={virtualRow.index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: `${virtualRow.size}px`,
            transform: `translateY(${virtualRow.start}px)`,
          }}
        >
          <EmployeeCard employee={employees[virtualRow.index]} />
        </div>
      ))}
    </>
  );
};

export default EmployeesList;

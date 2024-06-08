import { endpointFor } from "@/api/endpoints";
import { http, HttpHandler, HttpResponse } from "msw";
import {
  aValidEmployeeNamedAlice,
  departments,
  employees,
} from "./dto.factory";

type FakeDB = {
  employees: DTO.Employee[];
  reset: () => void;
};

export const fakeDB: FakeDB = {
  employees: [...employees],
  reset: () => {
    fakeDB.employees = employees;
  },
};

const listEmployees = http.get(endpointFor.employees, () => {
  return HttpResponse.json(fakeDB.employees);
});

const getEmployee = http.get(`${endpointFor.employees}/*`, () => {
  const employee = fakeDB.employees.find(
    (employee: DTO.Employee) => employee.id === aValidEmployeeNamedAlice.id
  );

  return HttpResponse.json(employee);
});

const getDepartments = http.get(endpointFor.departments, () => {
  return HttpResponse.json(departments);
});

const updateEmployee: HttpHandler = http.patch(
  `${endpointFor.employees}/*`,
  // @ts-ignore this is a tricky type
  ({ request }) => {
    const employee = fakeDB.employees.find(
      (employee: DTO.Employee) => employee.id === aValidEmployeeNamedAlice.id
    );

    if (!employee) return HttpResponse.json(request.body);

    employee.isActive = !employee?.isActive;

    return HttpResponse.json(employee);
  }
);

const deleteEmployee = http.delete(`${endpointFor.employees}/*`, () => {
  fakeDB.employees = fakeDB.employees.filter((employee) => employee.id !== 1);

  return HttpResponse.text("");
});

const getDepartmentHistory = http.get(
  endpointFor.departmentHistory("*"),
  () => {
    return HttpResponse.json({
      departmentHistory: [
        {
          employeeId: 1,
          departmentId: 1,
          date: "2024-06-08T12:52:24.159Z",
          department: {
            id: 1,
            name: "Engineering",
          },
        },
        {
          employeeId: 2,
          departmentId: 5,
          date: "2023-05-08T12:52:24.159Z",
          department: {
            id: 5,
            name: "HR",
          },
        },
      ],
    });
  }
);

const catchOtherEndpoints = http.all("*", ({ request }) => {
  console.warn(
    "Unhandled Request intercepted:",
    request.url.toString(),
    request.method,
    request.body?.toString()
  );

  return HttpResponse.text("Consider adding a mock response in MSW server");
});

export const handlers = [
  listEmployees,
  getEmployee,
  getDepartments,
  updateEmployee,
  deleteEmployee,
  getDepartmentHistory,
  catchOtherEndpoints,
];

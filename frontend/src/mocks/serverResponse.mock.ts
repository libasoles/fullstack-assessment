import { endpointFor } from "@/api/endpoints";
import { http, HttpHandler, HttpResponse } from "msw";
import { anEmployeeNamedAlice, createEmployee } from "./server.factory";

const employees = [
  createEmployee({ id: 1, firstName: "John Doe" }),
  createEmployee({ id: 2, firstName: "Jane Smith" }),
  createEmployee(anEmployeeNamedAlice),
];

const departments = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Sales" },
  { id: 4, name: "Finance" },
];

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
    (employee: DTO.Employee) => employee.id === anEmployeeNamedAlice.id
  );

  return HttpResponse.json(employee);
});

const getDepartments = http.get(endpointFor.departments, () => {
  return HttpResponse.json(departments);
});

type QueryParam = {
  id: string;
};

const updateEmployee: HttpHandler = http.patch(
  `${endpointFor.employees}/*`,
  // @ts-ignore
  ({ request }) => {
    const employee = fakeDB.employees.find(
      (employee: DTO.Employee) => employee.id === anEmployeeNamedAlice.id
    );

    if (!employee) return request.body;

    employee.isActive = !employee?.isActive;

    return employee;
  }
);

const deleteEmployee = http.delete(`${endpointFor.employees}/*`, () => {
  fakeDB.employees = fakeDB.employees.filter((employee) => employee.id !== 1);

  return HttpResponse.text("");
});

export const handlers = [
  listEmployees,
  getEmployee,
  getDepartments,
  updateEmployee,
  deleteEmployee,
];

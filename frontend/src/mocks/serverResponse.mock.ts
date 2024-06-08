import { endpointFor } from "@/api/endpoints";
import { http, HttpHandler, HttpResponse } from "msw";
import { anEmployeeNamedAlice, departments, employees } from "./dto.factory";

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

const updateEmployee: HttpHandler = http.patch(
  `${endpointFor.employees}/*`,
  // @ts-ignore this is a tricky type
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

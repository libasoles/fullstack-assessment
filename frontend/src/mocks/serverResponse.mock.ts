import { endpointFor } from "@/api/endpoints";
import { http, HttpResponse } from "msw";
import { createEmployee } from "./server.factory";

export const fakeDB = {
  employees: [
    createEmployee({ id: 1, firstName: "John Doe" }),
    createEmployee({ id: 2, firstName: "Jane Smith" }),
    createEmployee({ id: 3, firstName: "Alice Wonders" }),
  ],
};

export const handlers = [
  http.get(endpointFor.employees, () => {
    return HttpResponse.json(fakeDB.employees);
  }),
  http.get(endpointFor.departments, () => {
    return HttpResponse.json([
      { id: 1, name: "Engineering" },
      { id: 2, name: "Marketing" },
      { id: 3, name: "Sales" },
      { id: 4, name: "Finance" },
    ]);
  }),
  http.delete(endpointFor.employee(1), () => {
    fakeDB.employees = fakeDB.employees.filter((employee) => employee.id !== 1);

    return HttpResponse.text("");
  }),
];

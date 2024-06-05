import { endpointFor } from "@/api/endpoints";
import { http, HttpResponse } from "msw";
import { createEmployee } from "./factory";

export const handlers = [
  http.get(endpointFor.employees, () => {
    return HttpResponse.json([
      createEmployee({ id: 1, firstName: "John Doe" }),
      createEmployee({ id: 2, firstName: "Jane Smith" }),
      createEmployee({ id: 3, firstName: "Alice Wonders" }),
    ]);
  }),
];

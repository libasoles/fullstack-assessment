import config from "@/config/config";

const baseUrl = config.api.baseUrl;

export const endpointFor = {
  employees: `${baseUrl}/employees`,
  employee: (id: number) => `${baseUrl}/employees/${id}`,
  departments: `${baseUrl}/departments`,
};

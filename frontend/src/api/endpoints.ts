import config from "@/config/config";

const baseUrl = config.api.baseUrl;

export const endpointFor = {
  employees: `${baseUrl}/employees`,
  departments: `${baseUrl}/departments`,
};

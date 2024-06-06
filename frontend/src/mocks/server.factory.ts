export function createEmployee(data: Partial<DTO.Employee> = {}) {
  return {
    id: 18,
    firstName: "Romina",
    lastName: "De la Cruz",
    hireDate: "2020-12-04T00:56:58.332Z",
    department: {
      id: 1,
      name: "Engineering",
    },
    phone: "(+55) 1234567890",
    address: "Manila, 445",
    isActive: true,
    ...data,
  };
}

export const anEmployeeNamedAlice = createEmployee({
  id: 13,
  firstName: "Alice",
  lastName: "Liddell",
  hireDate: "2023-04-07T00:56:58.332Z",
  phone: "(+55) 445577343",
  address: "Siempre viva 123",
});

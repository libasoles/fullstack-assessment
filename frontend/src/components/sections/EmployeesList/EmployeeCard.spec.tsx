import { createEmployee } from "@/mocks/client.factory";
import MockedProviders from "@/mocks/queryClient";
import { render, screen } from "@testing-library/react";
import EmployeeCard from "./EmployeeCard";

const anEmployee = createEmployee({
  firstName: "John",
  lastName: "Doe",
  department: { id: 1, name: "Engineering" },
  hireDate: () => "February 3, 2024",
  daysSinceHire: "1y 4m 7d",
});

describe("Employee card", () => {
  beforeEach(() => {
    render(
      <MockedProviders>
        <EmployeeCard employee={anEmployee} />
      </MockedProviders>
    );
  });

  it("should display the main employee data", async () => {
    const employeeCard = screen.getByRole("listitem");

    expect(employeeCard).toHaveTextContent("John Doe (Engineering)");
    expect(employeeCard).toHaveTextContent("February 3, 2024 (1y 4m 7d)");
  });

  it("should display the actions to view and delete the employee", () => {
    const viewButton = screen.getByRole("link", { name: /view/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(viewButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});

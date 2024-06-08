import { createEmployee } from "@/mocks/domain.factory";
import { mockSystemDate } from "@/mocks/systemDate";
import ClientProviders from "@/providers/clientProviders";
import { render, screen } from "@testing-library/react";
import EmployeeCard from "./EmployeeCard";

const anEmployee = createEmployee({
  id: 13,
  firstName: "John",
  lastName: "Doe",
  department: { id: 1, name: "Engineering" },
  hireDate: () => "February 3, 2024",
  daysSinceHire: "1y 4m 7d",
});

describe("Employee card", () => {
  beforeEach(() => {
    const mockedDate = new Date("2024-7-1");
    mockSystemDate(mockedDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    render(
      <ClientProviders>
        <EmployeeCard employee={anEmployee} />
      </ClientProviders>
    );
  });

  it("should display the main employee data", async () => {
    const employeeCard = screen.getByRole("listitem");

    expect(employeeCard).toHaveTextContent("John Doe");
    expect(employeeCard).toHaveTextContent("(Engineering)");
    expect(employeeCard).toHaveTextContent("February 3, 2024 (1y 4m 7d)");
  });

  it("should display the actions to view and delete the employee", () => {
    const viewButton = screen.getByRole("link", { name: /view/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(viewButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    expect(viewButton).toHaveProperty("href", "http://localhost/employee/13");
  });
});

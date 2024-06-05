import EmployeesList from "@/components/sections/EmployeesList/EmployeesList";
import MockedProviders from "@/mocks/queryClient";
import { render, screen, waitFor } from "@testing-library/react";

describe("List of employees", () => {
  beforeEach(() => {
    render(
      <MockedProviders>
        <EmployeesList />
      </MockedProviders>
    );
  });

  it("should display a list of employees", async () => {
    await waitFor(() => {
      const employees = screen.getAllByRole("listitem");

      expect(employees).toHaveLength(3);
    });
  });
});

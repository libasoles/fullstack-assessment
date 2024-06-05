import EmployeesList from "@/components/sections/EmployeesList/EmployeesList";
import MockedProviders from "@/mocks/queryClient";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  it("should display a confirmation dialog when clicking on delete employee button", async () => {
    await waitFor(() => {
      const employeeCard = screen.getAllByRole("listitem")[0];

      const deleteButton = within(employeeCard).getByRole("button", {
        name: /delete/i,
      });

      userEvent.click(deleteButton);
    });

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");

      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveTextContent("Are you sure?");
      expect(dialog).toHaveTextContent(
        "The employee will not be displayed in the system anymore, so you won't be able to recover it."
      );
    });
  });
});

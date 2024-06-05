import EmployeesList from "@/components/sections/EmployeesList/EmployeesList";
import ClientProviders from "@/providers/clientProviders";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("List of employees", () => {
  beforeEach(() => {
    render(
      <ClientProviders>
        <EmployeesList />
      </ClientProviders>
    );
  });

  it("should display a list of employees", async () => {
    await waitFor(() => {
      const employees = screen.getAllByRole("listitem");

      expect(employees).toHaveLength(3);
      expect(employees[0]).toHaveTextContent("John Doe");
      expect(employees[1]).toHaveTextContent("Jane Smith");
      expect(employees[2]).toHaveTextContent("Alice Wonders");
    });
  });

  describe("Delete employee", () => {
    it("should display a confirmation dialog when clicking on delete employee button", async () => {
      await clickDeleteButton();

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");

        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveTextContent("Are you sure?");
        expect(dialog).toHaveTextContent(
          "The employee will not be displayed in the system anymore, so you won't be able to recover it."
        );
      });
    });

    it("should delete an employee when confirming the dialog", async () => {
      await clickDeleteButton();

      await clickConfirmButton();

      await waitFor(() => {
        const employees = screen.getAllByRole("listitem");
        const firstEmployee = employees[0];

        expect(employees).toHaveLength(2);
        expect(firstEmployee).not.toHaveTextContent("John Doe");
      });
    });
  });
});

async function clickDeleteButton() {
  await waitFor(() => {
    const employeeCard = screen.getAllByRole("listitem")[0];

    const deleteButton = within(employeeCard).getByRole("button", {
      name: /delete/i,
    });

    userEvent.click(deleteButton);
  });
}

async function clickConfirmButton() {
  await waitFor(() => {
    const confirmButton = screen.getByRole("button", { name: /ok/i });

    userEvent.click(confirmButton);
  });
}

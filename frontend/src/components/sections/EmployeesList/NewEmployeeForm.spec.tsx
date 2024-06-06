import ClientProviders from "@/providers/clientProviders";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddNewEmployeeButton from "./NewEmployeeForm";

describe("Add new employee", () => {
  beforeEach(() => {
    render(
      <ClientProviders>
        <AddNewEmployeeButton />
      </ClientProviders>
    );
  });

  it("should display a form to add a new employee", async () => {
    await waitFor(() => {
      const addButton = screen.getByRole("button", { name: /add/i });

      userEvent.click(addButton);
    });

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      const form = screen.getByRole("form");

      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveTextContent("New employee");
      expect(form).toBeInTheDocument();
    });

    // TODO: test on submit it adds the new employee to the list. And it it fails, displays a dialog (TODO)
  });
});

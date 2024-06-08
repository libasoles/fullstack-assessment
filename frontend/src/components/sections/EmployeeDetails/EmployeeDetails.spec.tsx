import { aValidEmployeeNamedAlice } from "@/mocks/dto.factory";
import ClientProviders from "@/providers/clientProviders";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmployeeDetails from "./EmployeeDetails";

describe("Employee details", () => {
  beforeEach(() => {
    render(
      <ClientProviders>
        <EmployeeDetails employeeId={aValidEmployeeNamedAlice.id} />
      </ClientProviders>
    );
  });

  it("should display the main employee data", async () => {
    await waitFor(() => {
      const employeeSection = screen.getByTestId("employee-details-section");

      expect(employeeSection).toHaveTextContent("Alice Liddell");
      expect(employeeSection).toHaveTextContent("Telephone:(+55) 445577343");
      expect(employeeSection).toHaveTextContent("Address:Siempre viva 123");
      expect(employeeSection).toHaveTextContent("April 6, 2023");
    });
  });

  describe("Employee state (active/inactive)", () => {
    it("should display a button to deactivate the employee", async () => {
      await waitFor(() => {
        const deactivateButton = getButton(/deactivate/i);

        expect(deactivateButton).toBeInTheDocument();
      });
    });

    it("should toggle the button from deactivate to activate and back when clicked", async () => {
      await waitFor(() => {
        clickButton(/deactivate/i);
      });

      await waitFor(() => {
        const activateButton = getButton(/activate/i);

        expect(activateButton).toBeInTheDocument();

        clickButton(/activate/i);
      });

      await waitFor(() => {
        const deactivateButton = getButton(/deactivate/i);

        expect(deactivateButton).toBeInTheDocument();
      });
    });

    it("should display the inactive label under the avatar", async () => {
      await waitFor(() => {
        const avatar = screen.getByTestId("employee-avatar");

        expect(avatar).not.toHaveTextContent(/inactive/i);

        clickButton(/deactivate/i);
      });

      await waitFor(() => {
        const avatar = screen.getByTestId("employee-avatar");

        expect(avatar).toHaveTextContent(/inactive/i);
      });
    });
  });

  describe("Department form", () => {
    it("should display a form to change the department", async () => {
      await waitFor(() => {
        const form = screen.getByTestId("update-deparment-form");

        expect(form).toBeInTheDocument();
      });
    });

    it("should change the department when submitting the form", async () => {
      function getUpdateButton() {
        const form = screen.getByTestId("update-deparment-form");

        return within(form).getByRole("button", {
          name: /update/i,
        });
      }

      await waitFor(() => {
        const form = screen.getByTestId("update-deparment-form");
        const dropdown = within(form).getByRole("combobox");

        expect(dropdown).toHaveTextContent("Engineering");

        const updateButton = getUpdateButton();
        expect(updateButton).toBeDisabled();

        userEvent.click(dropdown);
      });

      const option = await screen.findByRole("option", {
        name: "Marketing",
      });

      userEvent.click(option);

      await waitFor(() => {
        const form = screen.getByTestId("update-deparment-form");
        const dropdown = within(form).getByRole("combobox");

        expect(dropdown).toHaveTextContent("Marketing");
      });

      const updateButton = getUpdateButton();
      expect(updateButton).not.toBeDisabled();
    });
  });
});

function getButton(regex: RegExp) {
  return screen.getByRole("button", { name: regex });
}

function clickButton(regex: RegExp) {
  const button = getButton(regex);

  userEvent.click(button);
}

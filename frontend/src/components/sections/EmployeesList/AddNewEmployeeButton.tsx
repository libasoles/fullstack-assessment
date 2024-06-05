"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PropsWithChildren } from "react";
import { DepartmentsSelect } from "../DepartmentSelect/DepartmentsSelect";

const AddNewEmployeeButton = () => {
  // const { mutate } = useCreateEmployee();

  const handleConfirm = () => {
    //   mutate();
  };

  const isDialogFullWidth = useMediaQuery("(max-width:600px)");

  return (
    <ConfirmDialog
      title="New employee"
      trigger={({ onClick: handleClick }) => (
        <Button variant="outlined" size="small" onClick={handleClick}>
          Add Employee
        </Button>
      )}
      onConfirm={handleConfirm}
      fullScreen={isDialogFullWidth}
    >
      <form role="form">
        <Box sx={{ minWidth: { sm: 500 } }}>
          <PairOfFields>
            <TextField label="First name" variant="standard" fullWidth />
            <TextField label="Last name" variant="standard" fullWidth />
          </PairOfFields>

          <PairOfFields>
            <TextField label="Phone" variant="standard" fullWidth />
            <TextField label="Address" variant="standard" fullWidth />
          </PairOfFields>

          <PairOfFields>
            <DepartmentsSelect />

            <DatePicker
              label="Hire date"
              slotProps={{
                textField: { variant: "standard", fullWidth: true },
              }}
            />
          </PairOfFields>
        </Box>
      </form>
    </ConfirmDialog>
  );
};

const PairOfFields = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      m={2}
      direction={{ sm: "row" }}
      gap={2}
      justifyContent="space-between"
    >
      {children}
    </Stack>
  );
};

export default AddNewEmployeeButton;

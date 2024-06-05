"use client";

import { useCreateEmployee } from "@/api/createEmployee";
import ConfirmDialog from "@/components/ConfirmDialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { PropsWithChildren } from "react";
import { DepartmentsSelect } from "../DepartmentSelect/DepartmentsSelect";

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  hireDate: null,
  department: undefined,
};

type FormikValues = Omit<DTO.Employee, "hireDate" | "department"> & {
  hireDate: Dayjs | null;
  department?: DTO.Department;
};

const AddNewEmployeeButton = () => {
  const { mutate } = useCreateEmployee();

  // TODO: add fields validation (with yup or another library)
  const handleSubmit = (values: FormikValues) => {
    const newEmployee = {
      ...values,
      hireDate: values.hireDate?.toISOString(),
    };

    mutate(newEmployee as DTO.Employee);
  };

  const formik = useFormik<FormikValues>({
    initialValues,
    onSubmit: handleSubmit,
  });

  const handleConfirm = () => {
    formik.handleSubmit();
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
      isDisabled={
        !formik.dirty ||
        !formik.isValid ||
        !formik.values.hireDate ||
        !formik.values.department
      }
    >
      <form role="form">
        <Box sx={{ minWidth: { sm: 500 } }}>
          <PairOfFields>
            <TextField
              label="First name"
              name="firstName"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <TextField
              label="Last name"
              name="lastName"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </PairOfFields>

          <PairOfFields>
            <TextField
              label="Phone"
              name="phone"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <TextField
              label="Address"
              name="address"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </PairOfFields>

          <PairOfFields>
            <DepartmentsSelect
              name="department"
              onChange={(department) => {
                formik.setFieldValue("department", department);
              }}
              value={formik.values.department?.id}
            />

            <DatePicker
              label="Hire date"
              name="hireDate"
              slotProps={{
                textField: { variant: "standard", fullWidth: true },
              }}
              onChange={(value) => {
                formik.setFieldValue("hireDate", value);
              }}
              value={formik.values.hireDate}
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

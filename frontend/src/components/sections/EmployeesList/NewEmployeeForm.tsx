"use client";

import { useCreateEmployee } from "@/api/useCreateEmployee";
import ConfirmDialog, { useConfirmDialog } from "@/components/ConfirmDialog";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { PropsWithChildren } from "react";
import { z, ZodError } from "zod";
import { DepartmentsSelect } from "../DepartmentSelect/DepartmentsSelect";

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  hireDate: null,
  department: undefined,
};

const validationSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name is too short")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(3, "Username is too short")
    .max(50, "Username is too long"),
  phone: z.string().min(3, "Phone is too short").max(20, "Phone is too long"),
  address: z
    .string()
    .min(3, "Address is too short")
    .max(255, "Address is too long"),
  department: z.object({
    id: z.number(),
    name: z.string(),
  }),
  hireDate: z
    .custom<Dayjs>((val) => val instanceof dayjs, "Invalid date")
    .refine((data) => data < dayjs(Date.now()), {
      message: "Can't be future date",
    }),
});

type FormValues = Omit<DTO.Employee, "hireDate" | "department"> & {
  hireDate: Dayjs | null;
  department?: DTO.Department;
};

const AddNewEmployeeButton = () => {
  const { isOpen, openDialog, closeDialog } = useConfirmDialog();

  const { mutate, isError, error } = useCreateEmployee({
    onSuccess: () => {
      closeDialog();
      formik.resetForm();
    },
  });

  const validateForm = (values: FormValues) => {
    try {
      validationSchema.parse(values);
    } catch (error) {
      console.log({ error });
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const handleSubmit = (values: FormValues) => {
    const newEmployee = {
      ...values,
      hireDate: values.hireDate?.toISOString(),
    };

    mutate(newEmployee as DTO.Employee);
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validate: validateForm,
    onSubmit: handleSubmit,
    validateOnBlur: true,
  });

  const handleConfirm = () => {
    formik.handleSubmit();
  };

  const isDialogFullWidth = useMediaQuery("(max-width:600px)");

  // TODO: !formik.dirty || !formik.isValid || !validateForm(formik.values);
  const isSubmitButtonDisabled = false;

  return (
    <ConfirmDialog
      title="New employee"
      trigger={({ onClick: handleClick }) => (
        <Button variant="outlined" size="small" onClick={openDialog}>
          Add Employee
        </Button>
      )}
      onConfirm={handleConfirm}
      fullScreen={isDialogFullWidth}
      isDisabled={isSubmitButtonDisabled}
      isOpen={isOpen}
      handleOpen={openDialog}
      handleClose={closeDialog}
    >
      {isError && <Typography color="error">Something went wrong</Typography>}

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
              onBlur={formik.handleBlur}
              helperText={formik.touched.firstName && formik.errors.firstName}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
            />
            <TextField
              label="Last name"
              name="lastName"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              helperText={formik.touched.lastName && formik.errors.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
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
              onBlur={formik.handleBlur}
              helperText={formik.touched.phone && formik.errors.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
            />
            <TextField
              label="Address"
              name="address"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.address}
              onBlur={formik.handleBlur}
              helperText={formik.touched.address && formik.errors.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
            />
          </PairOfFields>

          <PairOfFields>
            <DepartmentsSelect
              name="department"
              value={formik.values.department?.id}
              onChange={(department) => {
                formik.setFieldValue("department", department);
              }}
              onBlur={formik.handleBlur}
              helperText={formik.touched.department && formik.errors.department}
              error={
                formik.touched.department && Boolean(formik.errors.department)
              }
            />

            <DatePicker
              label="Hire date"
              name="hireDate"
              value={formik.values.hireDate}
              disableFuture
              onChange={(value) => {
                formik.setFieldValue("hireDate", value);
                formik.validateField("hireDate");
              }}
              slotProps={{
                textField: {
                  variant: "standard",
                  fullWidth: true,
                  error: formik.touched.hireDate && !!formik.errors.hireDate,
                  helperText: formik.touched.hireDate && formik.errors.hireDate,
                },
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

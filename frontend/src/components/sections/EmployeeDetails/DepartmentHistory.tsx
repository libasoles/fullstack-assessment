"use client";

import { useFetchDepartmentHistory } from "@/api/useFetchDepartmentHistory";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type Props = {
  employeeId: number;
};

export function DepartmentHistory({ employeeId }: Props) {
  const { data, isLoading, isError } = useFetchDepartmentHistory({
    employeeId,
  });

  if (isLoading || isError || !data?.length) return <></>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Department History
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Department changes history">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Department</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.department.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DepartmentHistory;

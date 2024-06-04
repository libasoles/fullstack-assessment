import { routes } from "@/app/routes";
import { Employee } from "@/app/types/Employee";
import { daysSince } from "@/utils/date";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { EmployeeAvatar } from "./EmployeeAvatar";

type EmployeeCardProps = {
  employee: Employee;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { id, firstName, lastName, department, hireDate } = employee;

  const formattedDate = dayjs(hireDate).format("MMMM D, YYYY");
  const formattedDuration = daysSince(hireDate);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <EmployeeAvatar src="/avatar.jpg" alt={firstName} />
              <Box ml={2}>
                <Typography variant="h5" component="div" gutterBottom>
                  {firstName} {lastName}{" "}
                  <Typography color="text.secondary" component="span">
                    ({department.name})
                  </Typography>
                </Typography>

                <Typography color="text.secondary">Hire date</Typography>
                <Typography variant="body2">
                  {formattedDate}{" "}
                  <Typography color="text.secondary" component="span">
                    ({formattedDuration})
                  </Typography>
                </Typography>
              </Box>
            </Stack>

            <CardActions>
              <Stack justifyContent="flex-end" spacing={2}>
                <Button
                  size="small"
                  variant="outlined"
                  href={routes.employee(id)}
                >
                  View details
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon fontSize="small" />}
                >
                  Delete
                </Button>
              </Stack>
            </CardActions>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeCard;

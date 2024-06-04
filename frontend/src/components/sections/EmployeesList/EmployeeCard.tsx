import { routes } from "@/app/routes";
import { Employee } from "@/app/types/Employee";
import { EmployeeAvatar } from "@/components/EmployeeAvatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

type EmployeeCardProps = {
  employee: Employee;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const {
    id,
    avatar,
    name,
    firstName,
    department,
    hireDate,
    daysSinceHire,
    isActive,
  } = employee;

  const formattedDate = dayjs(hireDate).format("MMMM D, YYYY");

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <EmployeeAvatar
                src={avatar}
                alt={firstName}
                isDeactivated={!isActive}
              />
              <Box ml={2}>
                <Typography variant="h5" component="div" gutterBottom>
                  {name()}{" "}
                  <Typography color="text.secondary" component="span">
                    ({department.name})
                  </Typography>
                </Typography>

                <Typography color="text.secondary">Hire date</Typography>
                <Typography variant="body2">
                  {formattedDate}{" "}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="span"
                  >
                    ({daysSinceHire})
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
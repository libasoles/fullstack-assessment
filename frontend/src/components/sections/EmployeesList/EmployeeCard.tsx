import { EmployeeAvatar } from "@/components/EmployeeAvatar";
import { routes } from "@/config/routes";
import { Employee } from "@/types/Employee";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import DeleteEmployeeButton from "./DeleteEmployeeButton";

type EmployeeCardProps = {
  employee: Employee;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { id, name, firstName, department, hireDate, daysSinceHire, isActive } =
    employee;

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card role="listitem">
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <EmployeeAvatar alt={firstName} isDeactivated={!isActive} />
              <Box ml={4}>
                <Typography variant="h5" component="div" gutterBottom>
                  {name()}{" "}
                  <Typography color="text.secondary" component="span">
                    ({department?.name})
                  </Typography>
                </Typography>

                <Typography color="text.secondary">Hire date</Typography>
                <Typography variant="body2">
                  {hireDate()}{" "}
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
                  LinkComponent={Link}
                >
                  View details
                </Button>

                <DeleteEmployeeButton employee={employee} />
              </Stack>
            </CardActions>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeCard;

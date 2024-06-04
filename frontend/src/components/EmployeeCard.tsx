import { Employee } from "@/app/types/Employee";
import { daysSince } from "@/utils/date";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

type EmployeeCardProps = {
  employee: Employee;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { firstName, lastName, department, hireDate } = employee;

  const formattedDate = dayjs(hireDate).format("MMMM D, YYYY");

  const formattedDuration = daysSince(hireDate);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <CardContent>
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
        </CardContent>
        <CardActions>
          <Button size="small">View details</Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon fontSize="small" />}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EmployeeCard;

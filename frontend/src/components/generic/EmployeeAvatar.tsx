import Avatar, { AvatarProps } from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props extends AvatarProps {
  isDeactivated?: boolean;
}

const testId = "employee-avatar";

// TODO: solve visual glitch on activation change
export const EmployeeAvatar = ({
  isDeactivated = false,
  alt,
  ...rest
}: Props) => {
  const firstLetter = alt?.[0];

  const avatar = (
    <Avatar alt={alt} {...rest}>
      {firstLetter}
    </Avatar>
  );

  if (!isDeactivated) return <Box data-testid={testId}>{avatar}</Box>;

  return (
    <Stack spacing={0.5} width={40} data-testid={testId}>
      <Box>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          color="error"
          badgeContent=""
        >
          {avatar}
        </Badge>
      </Box>
      <Typography color="text.secondary" variant="caption">
        Inactive
      </Typography>
    </Stack>
  );
};

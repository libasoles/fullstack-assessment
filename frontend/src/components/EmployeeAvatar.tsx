import Avatar, { AvatarProps } from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props extends AvatarProps {
  isDeactivated?: boolean;
}

// TODO: solve visual glitch on activation change
export const EmployeeAvatar = ({ isDeactivated = false, ...rest }: Props) => {
  const avatar = <Avatar {...rest} />;

  if (!isDeactivated) return avatar;

  return (
    <Stack spacing={0.5}>
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

import Avatar, { AvatarProps } from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

interface Props extends AvatarProps {
  isDeactivated?: boolean;
}

export const EmployeeAvatar = ({ isDeactivated = false, ...rest }: Props) => {
  const avatar = <Avatar {...rest} />;

  if (!isDeactivated) return avatar;

  return (
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
  );
};

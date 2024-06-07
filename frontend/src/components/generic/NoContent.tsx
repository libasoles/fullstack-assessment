import { ErrorOutline, InfoOutlined } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  message: string;
  variant?: "info" | "error";
};

const NoContent = ({ message, variant = "info" }: Props) => (
  <Stack
    justifyContent="center"
    alignItems="center"
    minHeight={200}
    spacing={2}
  >
    {variant === "info" ? (
      <InfoOutlined fontSize="large" color="primary" />
    ) : (
      <ErrorOutline fontSize="large" color="error" />
    )}
    <Typography variant="body1">{message}</Typography>
  </Stack>
);

export default NoContent;

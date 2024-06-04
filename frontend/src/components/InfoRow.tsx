import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type InfoRowProps = {
  label: string;
  value: string;
};

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <Stack direction="row" spacing={1}>
    <Typography color="text.secondary">{label}:</Typography>
    <Typography color="text.primary">{value}</Typography>
  </Stack>
);

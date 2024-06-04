import Button from "@mui/material/Button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button variant="contained">Add Employee</Button>
    </main>
  );
}

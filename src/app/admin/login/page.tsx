import { Button, Input, Label, TextField } from "@heroui/react";
import { login } from "../actions";
import styles from "../admin.module.css";

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <span className={styles.kicker}>PRIVATE WORKSPACE</span>
        <h1>Portfolio admin</h1>
        <p>Masuk untuk menambahkan proyek nyata ke landing page.</p>
        <form action={login} className={styles.form}>
          <TextField fullWidth isRequired name="password" type="password">
            <Label>Admin password</Label>
            <Input variant="secondary" autoComplete="current-password" placeholder="Enter your password" />
          </TextField>
          {error && <p className={styles.error}>Password tidak sesuai.</p>}
          <Button className="dark-pill-button" type="submit" variant="ghost">Sign in</Button>
        </form>
      </section>
    </main>
  );
}

import { Fragment } from "react";
import Link from "next/link";
import styles from "../styles/404.module.scss";

export default function Custom404() {
  return (
    <main className={styles.main}>
      <h1>Error 404</h1>
      <h3>Strana nije pronađena / Page Not Found</h3>
      <Link href="/">Idite na naslovnu stranu / Go to Home page</Link>
    </main>
  );
}

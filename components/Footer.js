import { useRouter } from "next/router";
import Image from "next/image";
import Navlist from "./Navlist";
import arrow from "../assets/arrow-up.svg";
import styles from "../styles/Footer.module.scss";

export default function Footer() {
  const { locale: activeLocale, locales, asPath } = useRouter();

  const availableLocales = locales.filter((locale) => locale !== activeLocale);

  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className={styles.footer}>
      <div className={styles.copyrigh}>
        <p>© STUDIO MUŠMULA 2024.</p>
        <p>
          {activeLocale === "en" ? "ALL RIGHTS RESERVED" : "SVA PRAVA ZADŽRANA"}
        </p>
      </div>
      <Navlist locale={activeLocale} />
      <div className={styles.toTop}>
        <Image
          src={arrow}
          width={65}
          height={65}
          alt={"to-top"}
          onClick={toTop}
        />
      </div>
    </div>
  );
}

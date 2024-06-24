import Link from "next/link";
import styles from "../styles/Navlist.module.scss";

export default function Navlist({ size, closeMenu, isFooter, locale }) {
  function menuClose() {
    size === "large" && closeMenu();
  }

  return (
    <nav>
      <ul
        className={`${styles.navlist} ${
          size === "large" ? styles.navListLarge : ""
        }`}
      >
        <li>
          <Link onClick={menuClose} href="/#activities" className={styles.home}>
            {`${locale === "en" ? "WHAT ARE WE DOING" : "ŠTA SVE RADIMO"}`}
          </Link>
        </li>
        <li>
          <Link onClick={menuClose} href="/#weddings" className={styles.home}>
            {`${locale === "en" ? "OUR WEDDINGS" : "NAŠA VENČANJA"}`}
          </Link>
        </li>
        <li>
          <Link onClick={menuClose} href="/#about" className={styles.home}>
            {`${locale === "en" ? "ABOUT US" : "O NAMA"}`}
          </Link>
        </li>
        <li>
          <Link onClick={menuClose} href="/#contact" className={styles.home}>
            {`${locale === "en" ? "CONTACT" : "KONTAKT"}`}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

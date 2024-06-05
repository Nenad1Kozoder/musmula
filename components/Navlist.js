import Link from "next/link";
import styles from "../styles/Navlist.module.scss";

export default function Navlist({ size, closeMenu, isFooter }) {
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
          <Link
            onClick={menuClose}
            href="/#what-are-we-doing"
            className={styles.home}
          >
            ŠTA SVE RADIMO
          </Link>
        </li>
        <li>
          <Link
            onClick={menuClose}
            href="/#our-weddings"
            className={styles.home}
          >
            NAŠA VENČANJA
          </Link>
        </li>
        <li>
          <Link onClick={menuClose} href="/#about-us" className={styles.home}>
            O NAMA
          </Link>
        </li>
        <li>
          <Link onClick={menuClose} href="/#contact" className={styles.home}>
            KONTAKT
          </Link>
        </li>
      </ul>
    </nav>
  );
}

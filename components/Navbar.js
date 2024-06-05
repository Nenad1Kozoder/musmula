"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import close from "../assets/close.svg";
import menuIcon from "../assets/menu-icon.svg";
import menuIconDark from "../assets/menu-icon-dark.svg";
import logoWhite from "../assets/logo-white.svg";
import logoDark from "../assets/logo-dark.svg";

import styles from "../styles/Navbar.module.scss";
import Navlist from "./Navlist";

export default function Navbar() {
  const { locale: activeLocale, locales, asPath } = useRouter();

  const isHome = asPath === "/" || asPath.includes("/#");

  const [showMenu, setShowMenu] = useState(false);

  function menuHandler() {
    setShowMenu(!showMenu);
  }

  function menuOff() {
    setShowMenu(false);
  }

  return (
    <div className={styles.navbar}>
      <div
        className={`${styles.navbarContent} ${
          showMenu ? styles.isVisible : ""
        }`}
      >
        <div className={styles.navbarContentHolder}>
          <Link onClick={menuOff} href="/" className={styles.logo}>
            <Image src={logoDark} width={350} height={32} alt={"logo"} />
          </Link>

          <Navlist size="large" closeMenu={menuHandler} />

          <ul className={styles.langSwitch}>
            <li>
              <Link
                href={asPath}
                locale={"sr"}
                onClick={menuOff}
                className={styles.toggle}
              >
                Srpski
              </Link>
            </li>
            <li>|</li>
            <li>
              <Link
                href={asPath}
                locale={"en"}
                onClick={menuOff}
                className={styles.toggle}
              >
                English
              </Link>
            </li>
          </ul>
          <Image
            className={styles.close}
            onClick={menuHandler}
            src={close}
            width={30}
            height={30}
            alt={"close"}
          />
        </div>
      </div>
      <div className={styles.transparentHolder}>
        <Link onClick={menuOff} href="/">
          <Image
            src={isHome ? logoWhite : logoDark}
            width={350}
            height={32}
            alt={"logo"}
            className={styles.logo}
          />
        </Link>
        <Image
          className={styles.menuIcon}
          onClick={menuHandler}
          src={isHome ? menuIcon : menuIconDark}
          width={30}
          height={24}
          alt={"menu"}
        />
      </div>
    </div>
  );
}

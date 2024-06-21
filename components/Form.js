"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

import styles from "../styles/Form.module.scss";

export default function Form() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_16yhohb", "template_v965ye9", form.current, {
        publicKey: "n23RVcI3doAUOsGz9",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <form ref={form} className={styles.form} onSubmit={sendEmail}>
      <div className={styles.formItem}>
        <label htmlFor="name">Ime:</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          autoComplete="off"
          required
        />
      </div>
      <div className={styles.formItem}>
        <label htmlFor="lastname">Prezime:</label>
        <input
          type="text"
          id="user_lastname"
          name="user_lastname"
          autoComplete="off"
          required
        />
      </div>
      <div className={styles.formItem}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          autoComplete="off"
          required
        />
      </div>
      <div className={styles.formItem}>
        <label htmlFor="phone">Telefon:</label>
        <input
          type="phone"
          id="phone"
          name="phone"
          autoComplete="off"
          required
        />
      </div>
      <div className={styles.formItem}>
        <label htmlFor="date">Datum događaja:</label>
        <input type="text" id="date" name="date" autoComplete="off" required />
      </div>
      <div className={styles.formItem}>
        <label htmlFor="place">Mesto događaja:</label>
        <input
          type="text"
          id="place"
          name="place"
          autoComplete="off"
          required
        />
      </div>
      <div className={styles.textarea}>
        <label htmlFor="message">Vaša priča:</label>
        <textarea id="message" name="message" rows="10" cols="50" />
      </div>
      <button className={styles.submit} type="submit">
        POŠALJITE
      </button>
    </form>
  );
}

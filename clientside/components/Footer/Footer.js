import React from "react";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles._mid_footer}>
        <p>@{new Date().getFullYear()} &copy; Nirajchaurasiya</p>
      </div>
    </div>
  );
}

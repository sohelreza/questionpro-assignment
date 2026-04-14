import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/todos" className={styles.brand}>
        QuestionPro
      </Link>
      <Link to="/todos" className={styles.link}>
        Todos
      </Link>
      <Link to="/form-builder" className={styles.link}>
        Form Builder
      </Link>
      <Link to="/form-preview" className={styles.link}>
        Form Preview
      </Link>
    </nav>
  );
}

export default Navbar;

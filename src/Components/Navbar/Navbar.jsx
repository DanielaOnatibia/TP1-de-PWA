import { useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h2>NoCode</h2>
      </div>

      <button
        className={styles.menuToggle}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          {menuAbierto ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          ) : (
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          )}
        </svg>
      </button>

      <ul
        className={`${styles.enlaces} ${menuAbierto ? styles.menuAbierto : ""}`}
      >
        <li>
          <a href="#buscadores" onClick={cerrarMenu}>
            Buscador de Peliculas
          </a>
        </li>
        <li>
          <a href="#listados" onClick={cerrarMenu}>
            Listados
          </a>
        </li>
        <li>
          <a href="#formulario" onClick={cerrarMenu}>
            Agregar Nuevo
          </a>
        </li>
        <li>
          <a href="#integrantes" onClick={cerrarMenu}>
            Integrantes
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

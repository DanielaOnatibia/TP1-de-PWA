import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.institucion}>
        <p>
          Facultad de Informática - Programación Web Avanzada - TP 1 REACT 2026
        </p>
      </div>

      <div className={styles.equipo}>
        <ul className={styles.listaMiembros}>
          <li>
            <a
              href="https://github.com/DanielaOnatibia"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <strong>Daniela Oñitabia - FAI-4775</strong> - Scrum Master / PM
            </a>
          </li>
          <li>
            <a
              href="https://github.com/abrilgavilan11"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <strong>Abril Gavilan - FAI-5163</strong> - Desarrolladora
            </a>
          </li>
          <li>
            <a
              href="https://github.com/DevEriik"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <strong>Erick Gonzalez - FAI-3433</strong> - Desarrollador
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.enlaces}>
        <a
          href="https://github.com/DanielaOnatibia/TP1-de-PWA"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-3.975-1.395-.09-.225-.48-1.395-.825-1.68-.285-.225-.69-.585-.015-.6.63-.015 1.08.585 1.23.825.72 1.215 1.875.87 2.34.66.075-.525.285-.87.51-1.065-2.385-.27-4.89-1.185-4.89-5.31 0-1.17.42-2.13 1.11-2.88-.12-.27-.48-1.365.105-2.85 0 0 .9-.285 2.955 1.11A10.34 10.34 0 0112 6.84c.915.015 1.83.12 2.7.36 2.055-1.395 2.955-1.11 2.955-1.11.585 1.485.225 2.58.105 2.85.69.75 1.11 1.71 1.11 2.88 0 4.14-2.505 5.04-4.905 5.31.3.255.555.75.555 1.515 0 1.095-.015 1.98-.015 2.235 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          github.com/group/repo
        </a>

        <a
          href="https://github.com/users/DanielaOnatibia/projects/3"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H7V7h3v10zm4-4h-3V7h3v6zm4 4h-3V7h3v10z" />
          </svg>
          github.com/group/projects
        </a>
      </div>

      <div className={styles.creditos}>
        <p>Hecho por NoCode</p>
      </div>
    </footer>
  );
};

export default Footer;

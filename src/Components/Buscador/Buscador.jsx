import styles from "./Buscador.module.css";

const Buscador = ({ busqueda, onCambiarBusqueda }) => {
  return (
    <div className={styles.contenedorBuscador}>
      <span className={styles.iconoLupa}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>

      <input
        type="text"
        className={styles.inputBuscador}
        placeholder="Buscar por título o director..."
        value={busqueda}
        onChange={(e) => onCambiarBusqueda(e.target.value)}
      />
    </div>
  );
};

export default Buscador;

import styles from "./Filtrado.module.css";

const Filtrado = ({
  filtroGenero,
  setFiltroGenero,
  filtroTipo,
  setFiltroTipo,
}) => {
  return (
    <div className={styles.contenedorFiltros}>
      {/* Selector de Género */}
      <div className={styles.grupoFiltro}>
        <label htmlFor="select-genero" className={styles.label}>
          Género
        </label>
        <select
          id="select-genero"
          className={styles.select}
          value={filtroGenero}
          onChange={(e) => setFiltroGenero(e.target.value)}
        >
          <option value="">Todos los géneros</option>
          <option value="Acción">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Documental">Documental</option>
        </select>
      </div>

      {/* Selector de Tipo (Película / Serie) */}
      <div className={styles.grupoFiltro}>
        <label htmlFor="select-tipo" className={styles.label}>
          Tipo
        </label>
        <select
          id="select-tipo"
          className={styles.select}
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Ambos (Películas y Series)</option>
          <option value="película">Película</option>
          <option value="serie">Serie</option>
        </select>
      </div>
    </div>
  );
};

export default Filtrado;

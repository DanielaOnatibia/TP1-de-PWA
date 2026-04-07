import styles from "./Orden.module.css";
import Button from "../Button/Button";

const Orden = ({
  parametroOrden,
  setParametroOrden,
  direccionOrden,
  setDireccionOrden,
}) => {
  return (
    <div className={styles.contenedorOrden}>
      <label htmlFor="select-orden" className={styles.label}>
        Ordenar por
      </label>

      <div className={styles.controlesOrden}>
        <select
          id="select-orden"
          className={styles.select}
          value={parametroOrden}
          onChange={(e) => setParametroOrden(e.target.value)}
        >
          <option value="anio">Año</option>
          <option value="rating">Rating</option>
        </select>

        <div className={styles.botonesOrden}>
          <Button
            texto="Asc"
            color={
              direccionOrden === "asc"
                ? "var(--color-primario)"
                : "var(--texto-secundario)"
            }
            onClick={() => setDireccionOrden("asc")}
          />
          <Button
            texto="Desc"
            color={
              direccionOrden === "desc"
                ? "var(--color-primario)"
                : "var(--texto-secundario)"
            }
            onClick={() => setDireccionOrden("desc")}
          />
        </div>
      </div>
    </div>
  );
};

export default Orden;

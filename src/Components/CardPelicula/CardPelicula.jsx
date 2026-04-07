import Button from "../Button/Button";
import styles from "./CardPelicula.module.css";

const CardPelicula = ({ item, onCambiarEstado, onEditar, onEliminar }) => {
  const handleEliminar = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de que querés eliminar "${item.titulo}"?`,
    );
    if (confirmar) {
      onEliminar(item.id);
    }
  };

  return (
    <div
      /* CAMBIO 1: Se quitó el acento en "pelicula" para coincidir con Erick */
      className={`${styles.card} ${item.tipo === "pelicula" ? styles.bordePelicula : styles.bordeSerie}`}
    >
      <div className={styles.cabecera}>
        <h3 className={styles.titulo} title={item.titulo}>
          {item.titulo}
        </h3>
        <span className={styles.etiquetaTipo}>{item.tipo}</span>
      </div>

      <div className={styles.cuerpo}>
        <p>
          <strong>Director:</strong> {item.director}
        </p>
        <p>
          <strong>Año:</strong> {item.anio}
        </p>
        <p>
          <strong>Género:</strong> {item.genero}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {item.rating}
        </p>
      </div>

      <div className={styles.acciones}>
        {/* CAMBIO 2: Se usa !item.esVista (booleano) en lugar del string "por ver" */}
        {!item.esVista ? (
          <Button
            texto="Marcar como vista"
            color="var(--color-primario)"
            /* CAMBIO 3: Se quita el segundo parámetro "vista" para simplificar la lógica de Erick */
            onClick={() => onCambiarEstado(item.id)}
          />
        ) : (
          <Button
            texto="Volver a pendientes"
            color="var(--color-secundario)"
            /* CAMBIO 4: Se quita el segundo parámetro "por ver" */
            onClick={() => onCambiarEstado(item.id)}
          />
        )}

        <div className={styles.accionesSecundarias}>
          <Button
            texto="Editar"
            color="var(--color-secundario)"
            onClick={() => onEditar(item.id)}
          />
          <Button
            texto="Eliminar"
            color="var(--color-peligro)"
            onClick={handleEliminar}
          />
        </div>
      </div>
    </div>
  );
};

export default CardPelicula;
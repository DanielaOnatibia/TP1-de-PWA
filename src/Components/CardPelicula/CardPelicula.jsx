import { useState } from "react";
import Button from "../Button/Button";
import styles from "./CardPelicula.module.css";
import Modal from "../Modal/Modal";

const CardPelicula = ({ item, onCambiarEstado, onEditar, onEliminar }) => {
  const [verModal, setVerModal] = useState(false);

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
      className={`${styles.card} ${item.tipo === "pelicula" ? styles.bordePelicula : styles.bordeSerie}`}
    >
      <div
        className={styles.contenedorImagen}
        onClick={() => setVerModal(true)}
      >
        <img
          src={item.portada || "https://via.placeholder.com/150"}
          alt={item.titulo}
          className={styles.imagenCard}
        />
        <span className={styles.etiquetaTipo}>{item.tipo}</span>
      </div>
      <div className={styles.cabecera}>
        <h3 className={styles.titulo} title={item.titulo}>
          {item.titulo}
        </h3>
      </div>

      <div className={styles.acciones}>
        {!item.esVista ? (
          <Button
            texto="Marcar como vista"
            color="var(--color-primario)"
            onClick={(e) => {
              e.stopPropagation();
              onCambiarEstado(item.id);
            }}
          />
        ) : (
          <Button
            texto="Volver a pendientes"
            color="var(--color-secundario)"
            onClick={(e) => {
              e.stopPropagation();
              onCambiarEstado(item.id);
            }}
          />
        )}

        <div className={styles.accionesSecundarias}>
          <Button
            texto="Editar"
            color="var(--color-secundario)"
            onClick={(e) => {
              e.stopPropagation();
              onEditar(item);
            }}
          />
          <Button
            texto="Eliminar"
            color="var(--color-peligro)"
            onClick={(e) => {
              e.stopPropagation();
              handleEliminar(); /*se habian eliminado los parentesis de la funcion pq no eliminaba correctamente*/
            }}
          />
        </div>
      </div>
      <Modal booleano={verModal} onClose={() => setVerModal(false)}>
        <img src={item.portada} alt="Imagen" />
        <div className={styles.bloqueTexto}>
          <h2>{item.titulo}</h2>
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
        </div>
      </Modal>
    </div>
  );
};

export default CardPelicula;

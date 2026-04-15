import React, { useRef } from "react";
import styles from "./Carrusel.module.css";

const Carrusel = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direccion) => {
    if (scrollRef.current) {
      const cantidadScroll = 350;
      scrollRef.current.scrollBy({
        left: direccion === "izq" ? -cantidadScroll : cantidadScroll,
        behavior: "smooth",
      });
    }
  };
  
  const mostrarIndicador = React.Children.count(children) > 1;

  return (
    <div className={styles.wrapperGlobal}>
      {mostrarIndicador && (
        <div className={styles.indicadorMobile}>
          Deslizá para ver más{" "}
          <span className={styles.flechaAnimada}>&#8594;</span>
        </div>
      )}

      <div className={styles.contenedorCarrusel}>
        <button
          className={`${styles.botonFlecha} ${styles.flechaIzq}`}
          onClick={() => scroll("izq")}
          aria-label="Desplazar a la izquierda"
        >
          &#10094;
        </button>

        <div className={styles.pistaScroll} ref={scrollRef}>
          {children}
        </div>

        <button
          className={`${styles.botonFlecha} ${styles.flechaDer}`}
          onClick={() => scroll("der")}
          aria-label="Desplazar a la derecha"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carrusel;

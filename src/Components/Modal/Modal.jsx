import React, { useEffect } from "react";
import style from "./Modal.module.css";
import { createPortal } from "react-dom";

const Modal = ({ booleano, children, onClose, className }) => {
  useEffect(() => {
    if (booleano) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [booleano]);
  if (!booleano) return null;
  return createPortal(
    <>
      <div className={style.overlay} onClick={onClose}>
        <div
          className={`${style.contenedor} ${className || ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className={style.botonCerrar}>
            ❌
          </button>
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;

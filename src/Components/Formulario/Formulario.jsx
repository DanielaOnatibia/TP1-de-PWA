import React from "react";
import { useState } from "react";
import SelectorGeneral from "../SelectorGeneral/SelectorGeneral";
import styles from "./Formulario.module.css";
import Modal from "../Modal/Modal";

const archivoABase64 = (archivo) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => resolve(reader.result);
  });
};

const Formulario = ({
  setPeliculas,
  peliculas,
  generoPelis,
  peliAEditar,
  onCerrarEdicion,
}) => {
  const [titulo, setTitulo] = useState("");
  const [director, setDirector] = useState("");
  const [anio, setAnio] = useState("");
  const [genero, setGenero] = useState("");
  const [rating, setRating] = useState("");
  const [tipo, setTipo] = useState("");
  const [esVista, setEsVista] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [verModal, setVerModal] = useState(false);
  const [formatoInval, setFormatoInval] = useState(false);
  const [pesoInval, setPesoInval] = useState(false);

  // Este efecto detecta si hay una peli para editar y llena los campos
  React.useEffect(() => {
    if (peliAEditar) {
      setTitulo(peliAEditar.titulo);
      setDirector(peliAEditar.director);
      setAnio(peliAEditar.anio);
      setGenero(peliAEditar.genero);
      setRating(peliAEditar.rating);
      setTipo(peliAEditar.tipo);
      // Nota: la imagen no se precarga por seguridad del navegador,
      // pero mantenemos la que ya tiene si no se sube una nueva.
    }
  }, [peliAEditar]);

  const handleImagen = (e) => {
    const archivo = e.target.files[0];

    if (!archivo) {
      return;
    }

    const formatosValidos = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!formatosValidos.includes(archivo.type)) {
      setFormatoInval(true);
      setVerModal(true);
      e.target.value = "";
      return;
    }

    const limitePeso = 2 * 1024 * 1024;
    if (archivo.size > limitePeso) {
      setPesoInval(true);
      setVerModal(true);
      e.target.value = "";
      return;
    }

    setImagen(archivo);
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    setEnviado(true);

    if (
      titulo === "" ||
      director === "" ||
      anio === "" ||
      genero === "" ||
      rating === "" ||
      tipo === "" ||
      (imagen === null && !peliAEditar)
    ) {
      setVerModal(true);
      return;
    }

    let imagenFinal = peliAEditar ? peliAEditar.portada : "";
    if (imagen) {
      imagenFinal = await archivoABase64(imagen);
    }

    if (peliAEditar) {
      // MODO EDICIÓN
      const peliActualizada = {
        ...peliAEditar,
        titulo,
        director,
        portada: imagenFinal,
        anio,
        genero,
        rating,
        tipo,
      };

      setPeliculas(
        peliculas.map((p) => (p.id === peliAEditar.id ? peliActualizada : p)),
      );
      onCerrarEdicion();
    } else {
      // MODO AGREGAR
      const nuevaPeli = {
        id: Date.now(),
        titulo,
        director,
        portada: imagenFinal,
        anio,
        genero,
        rating,
        tipo,
        esVista: false,
      };

      setPeliculas([...peliculas, nuevaPeli]);
    }

    setTitulo("");
    setDirector("");
    setAnio("");
    setGenero("");
    setRating("");
    setTipo("");
    setImagen(null);
    setEnviado(false);
  };

  //Mensaje para el modal
  let mensajeModal;
  if (formatoInval) {
    mensajeModal = "⚠️​ Formato no permitido. Usa JPG, JPEG, PNG o WEBP. ⚠️​";
  } else if (pesoInval) {
    mensajeModal = "⚠️​ La imagen es muy pesada. El maximo es 2MB. ⚠️​";
  } else {
    mensajeModal = "⚠️​ Por favor, complete los campos. ⚠️​";
  }

  const tipoPeli = ["pelicula", "serie", "documental"];
  return (
    <form onSubmit={handleEnviar} className={styles.formContainer}>
      <h3>
        {peliAEditar ? "EDITAR PELÍCULA/SERIE" : "AGREGAR PELÍCULA/SERIE"}
      </h3>
      <label>Titulo de la Pelicula/Serie:</label>
      <input
        type="text"
        placeholder="Titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className={`${styles.inputField} ${enviado && titulo === "" ? styles.inputError : ""}`}
      />
      <label>Director:</label>
      <input
        type="text"
        placeholder="Director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        className={`${styles.inputField} ${enviado && director === "" ? styles.inputError : ""}`}
      />
      <label>Año de lanzamiento:</label>
      <input
        type="number"
        placeholder="Año"
        value={anio}
        onChange={(e) => setAnio(Number(e.target.value))}
        className={`${styles.inputField} ${enviado && anio === "" ? styles.inputError : ""}`}
      />
      <SelectorGeneral
        label="Género"
        options={generoPelis}
        value={genero}
        onChange={setGenero}
        className={` ${styles.selectores}${enviado && genero === "" ? styles.inputError : ""}`}
      />
      <label>Rating (ingrese un número del 0 al 5):</label>
      <input
        type="number"
        min={0}
        max={5}
        placeholder="Rating del 0 al 5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className={`${styles.inputField} ${enviado && rating === "" ? styles.inputError : ""}`}
      />

      <SelectorGeneral
        label="Tipo"
        options={tipoPeli}
        value={tipo}
        onChange={setTipo}
        className={` ${styles.selectores}${enviado && tipo === "" ? styles.inputError : ""}`}
      />

      <div className={styles.archivoContainer}>
        <label>Subir imagen de la Portada:</label>
        <label
          htmlFor="subir-portada"
          className={`${styles.archivoButton} ${enviado && imagen === null ? styles.archivoButtonError : null}`}
        >
          {imagen ? "✅ Imagen seleccionada" : "📸 Elegir imagen de Película"}
        </label>

        <input
          id="subir-portada"
          type="file"
          accept="image/*"
          onChange={handleImagen}
          className={styles.hiddenArchivo}
        />

        {imagen && <p className={styles.nombreArchivo}>{imagen.name}</p>}
      </div>

      <button type="submit" className={styles.buttonSubmit}>
        {peliAEditar ? "Guardar Cambios" : "Guardar Película"}
      </button>
      <Modal
        booleano={verModal}
        onClose={() => {
          (setVerModal(false), setFormatoInval(false), setPesoInval(false));
        }}
        className={styles.modalError}
      >
        <div className={styles.modalContenedor}>ERROR ⛔​</div>
        <p>{mensajeModal}</p>
      </Modal>
    </form>
  );
};

export default Formulario;

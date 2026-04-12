import React from "react";
import { useState } from "react";
import SelectorGeneral from "../SelectorGeneral/SelectorGeneral";
import styles from "./Formulario.module.css";

const archivoABase64 = (archivo) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => resolve(reader.result);
  });
};

const Formulario = ({ setPeliculas, peliculas, generoPelis, peliAEditar, onCerrarEdicion }) => {
  const [titulo, setTitulo] = useState("");
  const [director, setDirector] = useState("");
  const [anio, setAnio] = useState("");
  const [genero, setGenero] = useState("");
  const [rating, setRating] = useState("");
  const [tipo, setTipo] = useState("");
  const [esVista, setEsVista] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [imagen, setImagen] = useState(null);

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

    const formatosValidos = ["image/jpg", "image/png", "image/webp"];
    if (!formatosValidos.includes(archivo.type)) {
      alert("Formato no permitido. Usa JPG, PNG o WEBP.");
      e.target.value = "";
      return;
    }

    const limitePeso = 2 * 1024 * 1024;
    if (archivo.size > limitePeso) {
      alert("La imagen es muy pesada. El maximo es 2MB");
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
    tipo === ""
  ) {
    return false; 
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
      tipo 
    };

    setPeliculas(peliculas.map(p => p.id === peliAEditar.id ? peliActualizada : p));
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

  const tipoPeli = ["pelicula", "serie", "documental"];

  return (
    <form onSubmit={handleEnviar} className={styles.formContainer}>
      <h3>AGREGAR PELICULA</h3>
      <input
        type="text"
        placeholder="Titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className={`${styles.inputField} ${enviado && titulo === "" ? styles.inputError : ""}`}
      />
      <input
        type="text"
        placeholder="Director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        className={`${styles.inputField} ${enviado && director === "" ? styles.inputError : ""}`}
      />
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
      <input
        type="number"
        placeholder="Rating"
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
        <label htmlFor="subir-portada" className={styles.archivoButton}>
          {imagen ? "✅ Imagen seleccionada" : "📸 Elegir portada de peli"}
        </label>

        <input
          id="subir-portada"
          type="file"
          accept="image/*"
          onChange={handleImagen}
          className={`${styles.hiddenArchivo}`}
        />

        {imagen && <p className={styles.nombreArchivo}>{imagen.name}</p>}
      </div>

      <button type="submit" className={styles.buttonSubmit}>
        Guardar Película
      </button>
    </form>
  );
};

export default Formulario;

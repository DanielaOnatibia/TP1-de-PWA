import React from "react";
import { useState } from "react";
import SelectorGeneral from "../SelectorGeneral/SelectorGeneral";
import styles from "./Formulario.module.css";

const Formulario = ({ setPeliculas, peliculas, generoPelis }) => {
  const [titulo, setTitulo] = useState("");
  const [director, setDirector] = useState("");
  const [anio, setAnio] = useState("");
  const [genero, setGenero] = useState("");
  const [rating, setRating] = useState("");
  const [tipo, setTipo] = useState("");
  const [esVista, setEsVista] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e) => {
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
      alert("Por favor, completa los campos obligatorios");
      return; //Cortamos la funcion para no guardar nada
    }
    const nuevaPeli = {
      id: Date.now(),
      titulo: titulo,
      director: director,
      anio: anio,
      genero: genero,
      rating: rating,
      tipo: tipo,
      esVista: esVista,
    };

    setPeliculas([...peliculas, nuevaPeli]);
    // Despues de guardar restablecemos los valores
    setTitulo("");
    setDirector("");
    setAnio("");
    setGenero("");
    setRating("");
    setTipo("");
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
        className={`${enviado && genero === "" ? styles.inputError : ""}`}
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
        className={`${enviado && tipo === "" ? styles.inputError : ""}`}
      />

      <button type="submit" className={styles.buttonSubmit}>
        Guardar Película
      </button>
    </form>
  );
};

export default Formulario;

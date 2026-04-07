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

  const handleEnviar = (e) => {
    e.preventDefault();
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
      />

      <input
        type="text"
        placeholder="Director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />

      <input
        type="number"
        placeholder="Año"
        value={anio}
        onChange={(e) => setAnio(Number(e.target.value))}
      />

      <SelectorGeneral
        label="Género"
        options={generoPelis}
        value={genero}
        onChange={setGenero}
        className={styles.label}
      />

      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />

      <SelectorGeneral
        label="Tipo"
        options={tipoPeli}
        value={tipo}
        onChange={setTipo}
      />

      <button type="submit" className={styles.buttonSubmit}>
        Guardar Película
      </button>
    </form>
  );
};

export default Formulario;

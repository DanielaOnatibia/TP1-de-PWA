import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import SelectorGeneral from "../../Components/SelectorGeneral/SelectorGeneral";
import { useState, useEffect } from "react";

export function Home() {
  const [generoElegido, setGeneroElegido] = useState("");
  const [peliculas, setPeliculas] = useState(() => {
    const datosGuardados = localStorage.getItem("mis_pelis");

    if (datosGuardados) {
      return JSON.parse(datosGuardados);
    }

    return [{ id: 1, nombre: "Película de Prueba", genero: "Acción" }];
  });

  {
    /* Al cambiar la lista guarda automaticamente, se ejecuta cada vez que la variable pelicula se modifique */
  }
  useEffect(() => {
    localStorage.setItem("mis_pelis", JSON.stringify(peliculas));
    console.log("Guardado en LocalStorage:", peliculas);
  }, [peliculas]);

  const agregarPelicula = () => {
    const nuevaPeli = {
      id: Date.now(),
      nombre: "Nueva Peli",
      genero: "Comedia",
    };
    setPeliculas([...peliculas, nuevaPeli]);
  };

  const generoPelis = [
    "Acción",
    "Comedia",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Documental",
  ];

  return (
    <div className={styles.container}>
      <Titulo texto="Mi Aplicación PWA" />
      <SelectorGeneral
        label="Género de la película"
        options={generoPelis}
        value={generoElegido}
        onChange={setGeneroElegido}
      />

      {/* PRUEBA LOCALSTORAGE */}
      <div>
        <h1>Mis Peliculas</h1>
        <button onClick={agregarPelicula}>Agregar Película</button>
        <ul>
          {peliculas.map((p) => (
            <li key={p.id}>
              {" "}
              {p.nombre} ({p.genero}){" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;

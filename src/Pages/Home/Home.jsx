import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import Formulario from "../../Components/Formulario/Formulario";
import SelectorGeneral from "../../Components/SelectorGeneral/SelectorGeneral";
import { useState, useEffect } from "react";

export function Home() {
  const [generoElegido, setGeneroElegido] = useState("");
  const [peliculas, setPeliculas] = useState(() => {
    const datosGuardados = localStorage.getItem("mis_pelis");

    if (datosGuardados) {
      return JSON.parse(datosGuardados);
    }

    return [];
  });

  // Al cambiar la lista guarda automaticamente, se ejecuta cada vez que la variable pelicula se modifique

  useEffect(() => {
    localStorage.setItem("mis_pelis", JSON.stringify(peliculas));
    console.log("Guardado en LocalStorage:", peliculas);
  }, [peliculas]);

  const agregarPelicula = () => {
    const nuevaPeli = {
      id: Date.now(),
      titulo: "Nueva Peli",
      director: "Director Prueba",
      anio: 2024,
      genero: "Terror",
      rating: 5,
      tipo: "pelicula",
      esVista: false,
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
      <Formulario setPeliculas={setPeliculas} peliculas={peliculas} />
      <SelectorGeneral
        label="Género de la película"
        options={generoPelis}
        value={generoElegido}
        onChange={setGeneroElegido}
      />
      // PRUEBA LOCALSTORAGE
      <div>
        <h1>Mis Peliculas</h1>
        <button onClick={agregarPelicula}>Agregar Película</button>

       {/* Seccion de la lista */}
        <div className={styles.contenedorLista}>
          {peliculas.length === 0 ? (
            /* Esto se muestra si NO hay películas */
            <div className={styles.mensajeVacio}>
              <span className={styles.iconoVacio}>🍿</span>
              <p>Tu lista está vacía. ¡Agregá una película o serie para empezar!</p>
            </div>
          ) : (
            /* Esto se muestra si HAY películas (lo que ya hizo Erick) */
            peliculas.map((peli) => (
              <CardPelicula 
                key={peli.id} 
                item={peli} 
                onEliminar={eliminarPelicula} 
                onCambiarEstado={cambiarEstado}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;

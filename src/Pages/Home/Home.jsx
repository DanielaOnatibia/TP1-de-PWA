import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import Formulario from "../../Components/Formulario/Formulario";
import SelectorGeneral from "../../Components/SelectorGeneral/SelectorGeneral";
import CardPelicula from "../../Components/CardPelicula/CardPelicula"; // AGREGADO
import { useState, useEffect } from "react";

export function Home() {
  const [generoElegido, setGeneroElegido] = useState("");
  const [peliculas, setPeliculas] = useState(() => {
    const datosGuardados = localStorage.getItem("mis_pelis");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("mis_pelis", JSON.stringify(peliculas));
  }, [peliculas]);

  // Funciones de control (Agregadas para que no de error)
  const eliminarPelicula = (id) => {
    setPeliculas(peliculas.filter(p => p.id !== id));
  };

  const cambiarEstado = (id) => {
    setPeliculas(peliculas.map(p => 
      p.id === id ? { ...p, esVista: !p.esVista } : p
    ));
  };

  const agregarPelicula = () => {
    const nuevaPeli = {
      id: Date.now(),
      titulo: "Nueva Peli de Prueba",
      director: "Director",
      anio: 2024,
      genero: "Terror",
      rating: 5,
      tipo: "pelicula",
      esVista: false,
    };
    setPeliculas([...peliculas, nuevaPeli]);
  };

  const generoPelis = ["Acción", "Comedia", "Drama", "Terror", "Ciencia Ficción", "Documental"];

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

      {/* SECCIÓN DE LA LISTA */}
      <div>
        <h1>Mis Peliculas</h1>
        <button onClick={agregarPelicula}>+ Agregar Prueba</button>

        <div className={styles.contenedorLista}>
          {peliculas.length === 0 ? (
            <div className={styles.mensajeVacio}>
              <span className={styles.iconoVacio}>🍿</span>
              <p>Tu lista está vacía. ¡Agregá una película o serie para empezar!</p>
            </div>
          ) : (
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
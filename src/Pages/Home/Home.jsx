import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import Formulario from "../../Components/Formulario/Formulario";
import SelectorGeneral from "../../Components/SelectorGeneral/SelectorGeneral";
import CardPelicula from "../../Components/CardPelicula/CardPelicula";
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
      titulo: "Nueva Peli",
      director: "Director",
      anio: 2024,
      genero: "Acción",
      rating: 5,
      tipo: "pelicula",
      esVista: false,
    };
    setPeliculas([...peliculas, nuevaPeli]);
  };

  // --- LÓGICA DE ESTADÍSTICAS (Para los contadores de la imagen) ---
  const obtenerStats = (lista) => {
    const stats = { Total: lista.length };
    lista.forEach(p => {
      stats[p.genero] = (stats[p.genero] || 0) + 1;
    });
    return stats;
  };

  const pelisPorVer = peliculas.filter(p => !p.esVista);
  const pelisVistas = peliculas.filter(p => p.esVista);

  const statsPorVer = obtenerStats(pelisPorVer);
  const statsVistas = obtenerStats(pelisVistas);

  return (
    <div className={styles.container}>
      <Titulo texto="GESTOR DE PELÍCULAS Y SERIES" />
      
      {/* ESPACIO PARA BUSCADOR Y FILTROS (Tarea de Abril) */}
      <div className={styles.zonaFiltros}>
        <p>🔍 Buscador y Filtros (Próximamente)</p>
      </div>

      <button onClick={agregarPelicula} className={styles.botonPrueba}>+ Agregar Prueba</button>

      {/* CONTENEDOR PRINCIPAL LADO A LADO */}
      <div className={styles.dashboardListas}>
        
       {/* ESTE DIV ES EL SECRETO: Envuelve a las dos columnas */}
<div className={styles.dashboardListas}>

  {/* COLUMNA 1: POR VER */}
  <section className={styles.columna}>
    <div className={styles.headerListaPorVer}>
      <h2>CONTENIDO POR VER</h2>
    </div>
    <div className={styles.stats}>
      <p><strong>Total:</strong> {statsPorVer.Total} items</p>
      <p>Acción: {statsPorVer.Acción || 0}, Comedia: {statsPorVer.Comedia || 0}, Terror: {statsPorVer.Terror || 0}</p>
    </div>

    <div className={styles.listadoCards}>
      {pelisPorVer.length === 0 ? (
        <p className={styles.mensajeVacio}>No hay pendientes 🍿</p>
      ) : (
        pelisPorVer.map(p => (
          <CardPelicula key={p.id} item={p} onEliminar={eliminarPelicula} onCambiarEstado={cambiarEstado} />
        ))
      )}
    </div>
  </section>

  {/* COLUMNA 2: VISTO */}
  <section className={styles.columna}>
    <div className={styles.headerListaVisto}>
      <h2>CONTENIDO VISTO</h2>
    </div>
    <div className={styles.stats}>
      <p><strong>Total:</strong> {statsVistas.Total} items</p>
      <p>Acción: {statsVistas.Acción || 0}, Comedia: {statsVistas.Comedia || 0}, Terror: {statsVistas.Terror || 0}</p>
    </div>

    <div className={styles.listadoCards}>
      {pelisVistas.length === 0 ? (
        <p className={styles.mensajeVacio}>Todavía no viste nada 🎬</p>
      ) : (
        pelisVistas.map(p => (
          <CardPelicula key={p.id} item={p} onEliminar={eliminarPelicula} onCambiarEstado={cambiarEstado} />
        ))
      )}
    </div>
  </section>

</div>

      </div>
    </div>
  );
}

export default Home;
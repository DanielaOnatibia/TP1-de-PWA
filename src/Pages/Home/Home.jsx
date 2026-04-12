import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import Formulario from "../../Components/Formulario/Formulario";
import CardPelicula from "../../Components/CardPelicula/CardPelicula";
import Buscador from "../../Components/Buscador/Buscador";
import Filtrado from "../../Components/Filtrado/Filtrado";
import Orden from "../../Components/Orden/Orden";
import Footer from "../../Components/Footer/Footer";
import Modal from "../../Components/Modal/Modal";
import { useState, useEffect } from "react";


export function Home() {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [parametroOrden, setParametroOrden] = useState("anio");
  const [direccionOrden, setDireccionOrden] = useState("desc");
  const [peliAEditar, setPeliAEditar] = useState(null);

  const [peliculas, setPeliculas] = useState(() => {
    const datosGuardados = localStorage.getItem("mis_pelis");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  const generoPelis = [
    "Acción",
    "Comedia",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Documental",
  ];

  useEffect(() => {
    localStorage.setItem("mis_pelis", JSON.stringify(peliculas));
  }, [peliculas]);

  // --- FUNCIONES DE CONTROL ---
  const eliminarPelicula = (id) => {
    setPeliculas(peliculas.filter((p) => p.id !== id));
  };

  const guardarEdicion = (peliEditada) => {
    setPeliculas(peliculas.map(p => p.id === peliEditada.id ? peliEditada : p));
    setPeliAEditar(null); // Cerramos el modo edición
  };

  const cambiarEstado = (id) => {
    setPeliculas(
      peliculas.map((p) => (p.id === id ? { ...p, esVista: !p.esVista } : p)),
    );
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

  // --- LÓGICA DE ESTADÍSTICAS ---
  const obtenerStats = (lista) => {
    const stats = { Total: lista.length };
    lista.forEach((p) => {
      stats[p.genero] = (stats[p.genero] || 0) + 1;
    });
    return stats;
  };

  const pelisPorVer = peliculas.filter((p) => !p.esVista);
  const pelisVistas = peliculas.filter((p) => p.esVista);

  const statsPorVer = obtenerStats(pelisPorVer);
  const statsVistas = obtenerStats(pelisVistas);

  return (
    <div className={styles.container}>
      <Titulo texto="GESTOR DE PELÍCULAS Y SERIES" />

      {/* ZONA DE FILTROS */}
      <section className={styles.zonaFiltros}>
        <Buscador
          busqueda={textoBusqueda}
          onCambiarBusqueda={setTextoBusqueda}
        />

        <div className={styles.flexFiltros}>
          <Filtrado
            filtroGenero={filtroGenero}
            setFiltroGenero={setFiltroGenero}
            filtroTipo={filtroTipo}
            setFiltroTipo={setFiltroTipo}
          />

          <Orden
            parametroOrden={parametroOrden}
            setParametroOrden={setParametroOrden}
            direccionOrden={direccionOrden}
            setDireccionOrden={setDireccionOrden}
          />
        </div>
      </section>

      {/* DASHBOARD DE LISTAS */}
      <div className={styles.dashboardListas}>
        {/* COLUMNA 1: POR VER */}
        <section className={styles.columna}>
          <div className={styles.headerListaPorVer}>
            <h2>CONTENIDO POR VER</h2>
          </div>
          <div className={styles.stats}>
            <p>
              <strong>Total:</strong> {statsPorVer.Total} items
            </p>
            <p>
              Acción: {statsPorVer.Acción || 0}, Comedia:{" "}
              {statsPorVer.Comedia || 0}, Drama: {statsPorVer.Drama || 0},
              Terror: {statsPorVer.Terror || 0}, Ciencia Ficción:{" "}
              {statsPorVer["Ciencia Ficción"] || 0}, Documental:{" "}
              {statsPorVer.Documental || 0}
            </p>
          </div>

          <div className={styles.listadoCards}>
            {pelisPorVer.length === 0 ? (
              <p className={styles.mensajeVacio}>No hay pendientes 🍿</p>
            ) : (
              pelisPorVer.map((p) => (
                <CardPelicula
                  key={p.id}
                  item={p}
                  onEliminar={eliminarPelicula}
                  onCambiarEstado={cambiarEstado}
                  onEditar={setPeliAEditar}
                />
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
            <p>
              <strong>Total:</strong> {statsVistas.Total} items
            </p>
            <p>
              Acción: {statsVistas.Acción || 0}, Comedia:{" "}
              {statsVistas.Comedia || 0}, Drama: {statsVistas.Drama || 0},
              Terror: {statsVistas.Terror || 0}, Ciencia Ficción:{" "}
              {statsVistas["Ciencia Ficción"] || 0}, Documental:{" "}
              {statsVistas.Documental || 0}
            </p>
          </div>

          <div className={styles.listadoCards}>
            {pelisVistas.length === 0 ? (
              <p className={styles.mensajeVacio}>Todavía no viste nada 🎬</p>
            ) : (
              pelisVistas.map((p) => (
                <CardPelicula
                  key={p.id}
                  item={p}
                  onEliminar={eliminarPelicula}
                  onCambiarEstado={cambiarEstado}
                  onEditar={setPeliAEditar}
                />
              ))
            )}
          </div>
        </section>
      </div>

      {/* FORMULARIO Y BOTONES */}
      <Formulario
        setPeliculas={setPeliculas}
        peliculas={peliculas}
        generoPelis={generoPelis}
      />

      <button onClick={agregarPelicula} className={styles.botonPrueba}>
        + Agregar Prueba
      </button>

      {/* MODAL DE EDICIÓN (Se activa solo cuando peliAEditar no es null) */}
      {peliAEditar && (
        <Modal booleano={peliAEditar !== null} onClose={() => setPeliAEditar(null)}>
          <Formulario
            peliculas={peliculas}
            setPeliculas={setPeliculas}
            generoPelis={generoPelis}
            peliAEditar={peliAEditar} 
            onCerrarEdicion={() => setPeliAEditar(null)}
          />
        </Modal>
      )}

      <Footer />

      <Footer />
    </div>
  );
}

export default Home;

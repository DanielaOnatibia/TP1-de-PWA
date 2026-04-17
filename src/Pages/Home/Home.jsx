import styles from "./Home.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Titulo from "../../Components/Titulo/Titulo";
import Formulario from "../../Components/Formulario/Formulario";
import Carrusel from "../../Components/Carrusel/Carrusel";
import CardPelicula from "../../Components/CardPelicula/CardPelicula";
import Buscador from "../../Components/Buscador/Buscador";
import Filtrado from "../../Components/Filtrado/Filtrado";
import Orden from "../../Components/Orden/Orden";
import Button from "../../Components/Button/Button";
import Footer from "../../Components/Footer/Footer";
import Modal from "../../Components/Modal/Modal";
import { useState, useEffect } from "react";

const listaPeliculas = [
  {
    titulo: "Spider-Man",
    director: "Jon Watts",
    portada: "/public/portadaPelis/Spider_Man_No_Way_Home-642739124-large.jpg",
    anio: 2021,
    genero: "Acción",
    rating: 5,
    tipo: "pelicula",
    esVista: false,
  },
  {
    titulo: "The Batman",
    director: "Mat Reeves",
    portada: "/public/portadaPelis/The_Batman-301109776-large.jpg",
    anio: 2022,
    genero: "Acción",
    rating: 4,
    tipo: "pelicula",
    esVista: false,
  },
  {
    titulo: "Dune",
    director: "Denis Villeneuve",
    portada: "/public/portadaPelis/Dune.jpg",
    anio: 2021,
    genero: "Ciencia Ficción",
    rating: 5,
    tipo: "pelicula",
    esVista: false,
  },
  {
    titulo: "The Matrix",
    director: "Lana y Lilly Wachowski",
    portada: "/public/portadaPelis/theMatrix.jpg",
    anio: 1999,
    genero: "Ciencia Ficción",
    rating: 5,
    tipo: "pelicula",
    esVista: false,
  },
  {
    titulo: "Batman: El Caballero de la Noche",
    director: "Christopher Nolan",
    portada: "/public/portadaPelis/BatmanCaballero.jpg",
    anio: 2008,
    genero: "Acción",
    rating: 5,
    tipo: "pelicula",
    esVista: false,
  },
  {
    titulo: "Titanic",
    director: "James Cameron",
    portada: "/public/portadaPelis/titanic.jpg",
    anio: 1997,
    genero: "Drama",
    rating: 5,
    tipo: "pelicula",
    esVista: false,
  },
  {
    titulo: "El Conjuro",
    director: "James Wan",
    portada: "/public/portadaPelis/Elconjuro.jpg",
    anio: 2013,
    genero: "Terror",
    rating: 4,
    tipo: "pelicula",
    esVista: false,
  },
  {
    titulo: "Toy Story",
    director: "John Lasseter",
    portada: "/public/portadaPelis/toyStory.jpg",
    anio: 1995,
    genero: "Comedia",
    rating: 5,
    tipo: "pelicula",
    esVista: false,
  },
  {
    titulo: "The Last of Us",
    director: "Bruce Straley, Neil Druckmann",
    portada: "/public/portadaPelis/theLast.jpg",
    anio: 2023,
    genero: "Terror",
    rating: 3,
    tipo: "serie",
    esVista: false,
  },
];

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
  const [indice, setIndice] = useState(0);

  const agregarPelicula = () => {
    if (indice < listaPeliculas.length) {
      const nuevaPeli = { ...listaPeliculas[indice], id: Date.now() };
      setPeliculas([...peliculas, nuevaPeli]);
      setIndice(indice + 1);
    }
  };

  const generoPelis = [
    "Acción",
    "Comedia",
    "Drama",
    "Terror",
    "Ciencia Ficción",
  ];

  useEffect(() => {
    localStorage.setItem("mis_pelis", JSON.stringify(peliculas));
  }, [peliculas]);

  // --- FUNCIONES DE CONTROL ---
  const eliminarPelicula = (id) => {
    setPeliculas(peliculas.filter((p) => p.id !== id));
  };

  const guardarEdicion = (peliEditada) => {
    setPeliculas(
      peliculas.map((p) => (p.id === peliEditada.id ? peliEditada : p)),
    );
    setPeliAEditar(null); // Cerramos el modo edición
  };

  const cambiarEstado = (id) => {
    setPeliculas(
      peliculas.map((p) => (p.id === id ? { ...p, esVista: !p.esVista } : p)),
    );
  };

  // --- LÓGICA DE ESTADÍSTICAS ---
  const obtenerStats = (lista) => {
    const stats = { Total: lista.length };
    lista.forEach((p) => {
      stats[p.genero] = (stats[p.genero] || 0) + 1;
    });
    return stats;
  };

  // LÓGICA DE FILTRADO Y ORDENAMIENTO
  const peliculasProcesadas = peliculas
    .filter((peli) => {
      const limpiarTexto = (texto) => {
        if (!texto) return "";
        return String(texto)
          .toLowerCase()
          .trim()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      };

      const busquedaLimpia = limpiarTexto(textoBusqueda);
      const tituloLimpio = limpiarTexto(peli.titulo);
      const directorLimpio = limpiarTexto(peli.director);

      const coincideBusqueda =
        tituloLimpio.includes(busquedaLimpia) ||
        directorLimpio.includes(busquedaLimpia);

      const coincideGenero =
        filtroGenero === "" || peli.genero === filtroGenero;

      const coincideTipo = filtroTipo === "" || peli.tipo === filtroTipo;

      return coincideBusqueda && coincideGenero && coincideTipo;
    })
    .sort((a, b) => {
      const valorA = a[parametroOrden];
      const valorB = b[parametroOrden];

      if (valorA < valorB) return direccionOrden === "asc" ? -1 : 1;
      if (valorA > valorB) return direccionOrden === "asc" ? 1 : -1;
      return 0;
    });

  // SEPARACIÓN Y ESTADÍSTICAS
  const pelisPorVer = peliculasProcesadas.filter((p) => !p.esVista);
  const pelisVistas = peliculasProcesadas.filter((p) => p.esVista);

  const statsPorVer = obtenerStats(pelisPorVer);
  const statsVistas = obtenerStats(pelisVistas);

  return (
    <div className={styles.container}>
      <Navbar />
      <Titulo texto="GESTOR DE PELÍCULAS Y SERIES" />

      {/* ZONA DE FILTROS */}
      <section id="buscadores" className={styles.zonaFiltros}>
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
      <div id="listados" className={styles.dashboardListas}>
        {/* COLUMNA 1: POR VER */}
        <section className={styles.columna}>
          <div className={styles.headerListaPorVer}>
            <h2>CONTENIDO POR VER</h2>
          </div>
          <div className={styles.stats}>
            <div className={styles.totalItem}>
              TOTAL: <span>{statsPorVer.Total}</span>
            </div>
            {statsPorVer.Acción > 0 && (
              <div className={styles.statItem} title="Acción">
                💥<span>{statsPorVer.Acción}</span>
              </div>
            )}

            {statsPorVer.Comedia > 0 && (
              <div className={styles.statItem} title="Comedia">
                😂 <span>{statsPorVer.Comedia}</span>
              </div>
            )}

            {statsPorVer.Drama > 0 && (
              <div className={styles.statItem} title="Drama">
                🎭 <span>{statsPorVer.Drama}</span>
              </div>
            )}

            {statsPorVer.Terror > 0 && (
              <div className={styles.statItem} title="Terror">
                👻 <span>{statsPorVer.Terror}</span>
              </div>
            )}

            {statsPorVer["Ciencia Ficción"] > 0 && (
              <div className={styles.statItem} title="Ciencia Ficción">
                🚀 <span>{statsPorVer["Ciencia Ficción"]}</span>
              </div>
            )}

            {statsPorVer.Documental > 0 && (
              <div className={styles.statItem} title="Documental">
                🎥 <span>{statsPorVer.Documental}</span>
              </div>
            )}
          </div>

          <Carrusel>
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
          </Carrusel>
        </section>

        {/* COLUMNA 2: VISTO */}
        <section className={styles.columna}>
          <div className={styles.headerListaVisto}>
            <h2>CONTENIDO VISTO</h2>
          </div>
          <div className={styles.stats}>
            <div className={styles.totalItem}>
              TOTAL: <span>{statsVistas.Total}</span>
            </div>
            {statsVistas.Acción > 0 && (
              <div className={styles.statItem} title="Acción">
                💥<span>{statsVistas.Acción}</span>
              </div>
            )}

            {statsVistas.Comedia > 0 && (
              <div className={styles.statItem} title="Comedia">
                😂 <span>{statsVistas.Comedia}</span>
              </div>
            )}

            {statsVistas.Drama > 0 && (
              <div className={styles.statItem} title="Drama">
                🎭 <span>{statsVistas.Drama}</span>
              </div>
            )}

            {statsVistas.Terror > 0 && (
              <div className={styles.statItem} title="Terror">
                👻 <span>{statsVistas.Terror}</span>
              </div>
            )}

            {statsVistas["Ciencia Ficción"] > 0 && (
              <div className={styles.statItem} title="Ciencia Ficción">
                🚀 <span>{statsVistas["Ciencia Ficción"]}</span>
              </div>
            )}

            {statsVistas.Documental > 0 && (
              <div className={styles.statItem} title="Documental">
                🎥 <span>{statsVistas.Documental}</span>
              </div>
            )}
          </div>

          <Carrusel>
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
          </Carrusel>
        </section>
      </div>
      <div className={styles.contenedorBotonAgregarPelicula}>
        <Button
          texto="Agregar Película 🎥"
          color="#3b759e"
          onClick={agregarPelicula}
        />
      </div>

      {/* FORMULARIO Y BOTONES */}

      <div id="formulario" className={styles.contenedorFormularioCentro}>
        <Formulario
          setPeliculas={setPeliculas}
          peliculas={peliculas}
          generoPelis={generoPelis}
        />
      </div>

      {/* MODAL DE EDICIÓN (Se activa solo cuando peliAEditar no es null) */}
      {peliAEditar && (
        <Modal
          booleano={peliAEditar !== null}
          onClose={() => setPeliAEditar(null)}
        >
          <Formulario
            peliculas={peliculas}
            setPeliculas={setPeliculas}
            generoPelis={generoPelis}
            peliAEditar={peliAEditar}
            onCerrarEdicion={() => setPeliAEditar(null)}
          />
        </Modal>
      )}
      <div id="integrantes" className={styles.contenedorFooter}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;

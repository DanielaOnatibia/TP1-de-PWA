import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";
import SelectorGeneral from "../../Components/SelectorGeneral/SelectorGeneral";
import { useState } from "react";

export function Home() {
  const generoPelis = [
    "Acción",
    "Comedia",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Documental",
  ];
  const [generoElegido, setGeneroElegido] = useState("");

  return (
    <div className={styles.container}>
      <Titulo texto="Mi Aplicación PWA" />
      <SelectorGeneral
        label="Género de la película"
        options={generoPelis}
        value={generoElegido}
        onChange={setGeneroElegido}
      />
    </div>
  );
}

export default Home;

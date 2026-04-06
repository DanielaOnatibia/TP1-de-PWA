import styles from "./Home.module.css";
import Titulo from "../../Components/Titulo/Titulo";

export function Home() {
  return (
    <div className={styles.container}>
      <Titulo texto="Mi Aplicación PWA" />
      <h1>Hola mundo</h1>
    </div>
  );
}

export default Home;

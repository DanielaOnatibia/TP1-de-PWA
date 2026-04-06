import styles from "./Titulo.module.css";

const Titulo = ({ texto }) => {
  return (
    <h1 className={styles.principal}>
      {texto}
    </h1>
  );
};

export default Titulo;
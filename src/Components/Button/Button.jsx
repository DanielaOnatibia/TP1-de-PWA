import styles from "./Button.module.css";

const Button = ({ texto, color, onClick }) => {
  return (
    <button
      className={styles.boton}
      style={{ backgroundColor: color || "var(--color-primario)" }}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Button;

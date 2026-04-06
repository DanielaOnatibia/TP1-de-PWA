import style from "./SelectorGeneral.module.css";

const SelectorGeneral = ({ label, options, value, onChange }) => {
  // Generamos un id único basado en el label para accesibilidad
  const idSelect = `select-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={style.container}>
      <label htmlFor={idSelect} className={style.labelText}>{label}</label>
      <select
        id={idSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={style.selectCampus}
      >
        <option value=""> -- Seleccione una opción -- </option>
        {options.map((opcion, index) => (
          <option key={index} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorGeneral;
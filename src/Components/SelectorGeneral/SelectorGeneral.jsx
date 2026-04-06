import React from "react";
import style from "./SelectorGeneral.module.css";

const SelectorGeneral = ({ label, options, value, onChange }) => {
  return (
    <div className={style.container}>
      {/* Usamos la prop 'label' para texto de arriba */}
      <label className={style.labelText}>{label}</label>
      {/* Aca el valor y la funcion de cambio vienen por props */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={style.selectCampus}
      >
        <option value=""> -- Selecione un género -- </option>
        {/* Renderizo con .map */}
        {options.map((genero, index) => (
          <option key={index} value={genero}>
            {genero}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorGeneral;

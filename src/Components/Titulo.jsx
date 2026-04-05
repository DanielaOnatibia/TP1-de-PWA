import React from "react";

const Titulo = ({ texto }) => {
  return (
    <>
      <h1 style={{ color: "#4a90e2", textAlign: "center", fontSize: "2.5rem" }}>
        {texto}
      </h1>
    </>
  );
};

export default Titulo;

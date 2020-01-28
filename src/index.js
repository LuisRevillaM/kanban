import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <App
    initialCards={[
      { content: "Lavar la ropa", boardId: 1, id: 1 },
      { content: "Doblar la ropa", boardId: 1, id: 2 },
      { content: "Limpiar la cocina", boardId: 2, id: 3 },
      { content: "Comprar ingredientes", boardId: 2, id: 4 },
      { content: "Reservar restaurante", boardId: 3, id: 5 },
      { content: "Comprar tickets para el museo", boardId: 3, id: 6 },
      { content: "Limpiar la sala", boardId: 4, id: 7 },
      { content: "Limpiar el balcon", boardId: 4, id: 8 }
    ]}
  />,
  document.getElementById("root")
);

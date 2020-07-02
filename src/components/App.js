import React from "react";
import css from "../styles/App.module.css";
import img from "@assets/0.jpeg";
import "../styles/App.css";

export function App() {
  return (
    <div>
      <div className={css.text}>
        <h1>My React App!</h1>
      </div>

      <img src={img} style={{ width: 200 }} />

      <div className="text2">
        <h1>hello children</h1>
      </div>
    </div>
  );
}

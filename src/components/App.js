import React from "react";
import css from "../styles/App.module.css";
import "../styles/App.css";

export function App() {
  return (
    <div>
      <div className={css.text}>
        <h1>Hello My React App!</h1>
      </div>

      <div className="text2">
        <h1>children</h1>
      </div>
    </div>
  );
}

import React from "react";
import css from "../styles/App.module.css";
// @ts-ignore
import img from "@assets/0.jpeg";
// @ts-ignore
import img1 from "@assets/1.jpeg";
import { Header } from "@ui/index";
import "../styles/App.css";

const id = { age: 12 };

export function App() {
  return (
    <div>
      <div className={css.text}>
        <h1>Hello My React App! with css modules</h1>
        <Header id={12} />
      </div>

      <img src={img} style={{ width: 200 }} />
      <img src={img1} style={{ width: 200 }} />

      <div className="text2">
        <h1>hello children with css {id?.age}</h1>
      </div>
    </div>
  );
}

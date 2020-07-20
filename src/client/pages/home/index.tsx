import React from "react";
import { Link } from "react-router-dom";
import img from "@assets/0.jpeg";
import img1 from "@assets/1.jpeg";
import { Header } from "@ui/index";
import { session } from "@features/session";
import css from "./index.module.css";
import "./index.css";

const id = { age: 12 };

export function Home() {
  return (
    <div>
      <div className={css.text}>
        <h1>Hello My React App! with css modules</h1>
        <h1>session: {JSON.stringify(session)}</h1>

        <Header id={12} />
      </div>

      <img src={img} style={{ width: 200 }} />
      <img src={img1} style={{ width: 200 }} />

      <div className="text2">
        <h1>hello children with css {id?.age}</h1>
        <Link to="about">about</Link>
      </div>
    </div>
  );
}

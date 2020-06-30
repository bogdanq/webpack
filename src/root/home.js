"use strict";

import { Component1 } from "./testFolder/component";
import css from "./style.css";

if (NODE_ENV === "development") {
  console.log("development ready");
}

console.log("Component1", Component1);

export const welcome = () => alert("welcome");

console.log("NODE_ENV", NODE_ENV);
console.log("LANG", LANG);

console.log("css", css);

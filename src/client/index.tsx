import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import { createRoutes, RouteTypes } from "react-router-reconfig";
import { Home } from "@pages/home";
import { About } from "@pages/about";

const routes = (): RouteTypes<any> => [
  {
    component: Home,
    path: "/",
  },
  {
    component: About,
    path: "/about",
  },
];

function App() {
  const Routes = React.useMemo(
    () => createRoutes({ config: routes(), context: {} }),
    []
  );

  return (
    <BrowserRouter>
      <Switch>{Routes}</Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

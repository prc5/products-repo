import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";

import { routes, Route } from "./config/routes.config";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

/* eslint-disable */
import React from "react";
import { Route, Redirect } from "react-router-dom";

import { TOKEN_STORAGE_FIELD } from "../constant/auth.constant";

interface Props {
  component: any;
}

const AuthRoute = ({ component, ...rest }: Props) => {
  const isValidRoute = localStorage.getItem(TOKEN_STORAGE_FIELD);
  const Component = component;

  return (
    <Route
      {...rest}
      render={(props: any) =>
        isValidRoute ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;

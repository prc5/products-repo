import React from "react";
import { Route as RouterRoute } from "react-router-dom";

import { AuthRoute } from "../components";
import Login from "../pages/login";
import Upload from "../pages/upload";
import ProductsList from "../pages/products/list";
import ProductsForm from "../pages/products/form";

export interface RouteConfig {
  path: string;
  component: any;
  name: string;
  exact: boolean;
  auth: boolean;
}

export function Route(route: RouteConfig) {
  const RouteComponent = route.auth ? AuthRoute : RouterRoute;
  return <RouteComponent {...route} />;
}

export const routes: RouteConfig[] = [
  {
    path: "/login",
    component: Login,
    name: "Login",
    exact: false,
    auth: false,
  },
  {
    path: "/upload",
    component: Upload,
    name: "Upload",
    exact: false,
    auth: false,
  },
  {
    path: "/",
    component: ProductsList,
    name: "Products",
    exact: true,
    auth: true,
  },
  {
    path: "/products",
    component: ProductsList,
    name: "Products",
    exact: true,
    auth: true,
  },
  {
    path: "/products/add",
    component: ProductsForm,
    name: "Products add",
    exact: false,
    auth: true,
  },
  {
    path: "/products/edit/:productId",
    component: ProductsForm,
    name: "Products edit",
    exact: false,
    auth: true,
  },
  {
    path: "*",
    component: ProductsList,
    name: "Products",
    exact: true,
    auth: true,
  },
];

import fetchMiddleware from "../api.middleware";

export const getProducts = () =>
  fetchMiddleware({
    method: "get",
    url: `/product/`,
  });

export const getProductById = (productId: string) =>
  fetchMiddleware({
    method: "get",
    url: `/product/${productId}`,
  });

export const createProduct = (data: any) =>
  fetchMiddleware({
    method: "post",
    url: `/product`,
    data,
  });

export const deleteProduct = (id: string) =>
  fetchMiddleware({
    method: "delete",
    url: `/product/${id}`,
  });

export const updateProduct = (id: string, data: any) =>
  fetchMiddleware({
    method: "put",
    url: `/product/${id}`,
    data,
  });

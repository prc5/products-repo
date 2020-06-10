import fetchMiddleware from "../api.middleware";

export const uploadFile = (data: any) =>
  fetchMiddleware({
    method: "post",
    url: `/file`,
    data,
  });

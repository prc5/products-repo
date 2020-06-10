import fetchMiddleware from "../api.middleware";

export const signIn = (data: any) =>
  fetchMiddleware({
    method: "post",
    url: `/auth/signin`,
    data,
  });

export const signUp = (data: any) =>
  fetchMiddleware({
    method: "post",
    url: `/auth/signup`,
    data,
  });

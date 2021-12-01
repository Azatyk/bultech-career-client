import request from "./request";

export const login = (payload) =>
  request({
    url: "/auth/login",
    method: "POST",
    data: payload,
  }).then((res) => res.data);

export const register = (payload) =>
  request({
    method: "POST",
    data: payload,
  }).then((res) => res.data);

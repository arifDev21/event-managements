import { Children, useEffect, useState } from "react";
import { api } from "../src/api/axios";

export const Authprovider = () => {
  const user = localStorage.getItem("auth");
  const [isLoading, setIsLoading] = useState(true);
  const fetcUser = async () => {
    await api.get(`/user/${user.id}`).then((res) => {
      dispatch;
    });
  };
  useEffect(() => {}, []);
  return isLoading ? isLoading : Children;
}; // redux
// refresh => app.js => cek di localStorage => id
// id => get.api

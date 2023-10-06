import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const nav = useNavigate();
  useEffect(() => {
    nav("/home");
  }, []);
  return <></>;
};

export default Redirect;

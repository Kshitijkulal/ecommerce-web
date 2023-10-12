import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [okay, setOkay] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`/api/auth/v1/user-auth`);
      if (res.data.okay) {
        setOkay(true);
      } else {
        setOkay(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return okay ? <Outlet /> : <Spinner/>;
}

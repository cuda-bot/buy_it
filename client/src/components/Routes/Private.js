import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const Private = () => {
  const [auth, setAuth] = useAuthContext();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth", {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Private;

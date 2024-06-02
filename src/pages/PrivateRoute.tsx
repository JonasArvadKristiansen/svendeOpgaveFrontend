import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import cookieExist from "../utility/cookieExist";

interface Props {
  component: React.ReactNode;
  roles: string[];
}

interface ExtraJwtInfo {
  user: {
    id: number;
    type: string;
  };
}

function PrivateRoute(prop: Props) {
   //Makes us able to use libary functions
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const token = cookies["Authorization"];

  useEffect(() => {
    if (cookieExist(token, navigate)) {
      const decodeToken = jwtDecode<ExtraJwtInfo>(token);
      const isTypeCorrect = prop.roles?.includes(decodeToken.user.type);

      if (!isTypeCorrect) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {prop.component}
    </>
  );
}

export default PrivateRoute;

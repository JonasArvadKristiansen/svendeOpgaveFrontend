import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import DeafultLayout from "../layout/DeafultLayout";
import AdminProfil from "../components/ElementBlocks/profile/AdminProfil";
import ChangePassword from "../components/ElementBlocks/profile/ChangePassword";
import CompanyProfil from "../components/ElementBlocks/profile/CompanyProfil";
import UserProfil from "../components/ElementBlocks/profile/UserProfil";
import endpoint from "../config.json";

import "../css/profile.css";

interface ExtraJwtInfo {
  user: {
    id: number;
    type: string;
  };
}

function Profile() {
  const [userType, setUserType] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  let response;

  useEffect(() => {
    const token = cookies["jwt-cookie"];
    setToken(token);
    const decodeToken = jwtDecode<ExtraJwtInfo>(token);
    setUserType(decodeToken.user.type);
  }, []);

  const deleteUser = async () => {
    try {
      switch (userType) {
        case "Normal user":
          response = await fetch(`${endpoint.path}api/user/delete`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` },
          });
          break;
        case "Company user":
          response = await fetch(`${endpoint.path}api/user/delete`, {
            method: "POST",
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` },
          });
          break;

        default:
          throw new Error("Bruger type eksistere ikke");
      }

      if (!response.ok) {
        throw new Error("cringe");
      }

      removeCookie("jwt-cookie");
      navigate("/");

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getDate = async (token: string) => {
    try {
      const response = await fetch(`${endpoint.path}api/user/info`, {
        method: "GET",
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` },
      });

      console.log(response);

      const jsonData = await response.json();
      console.log(jsonData);

      if (!response.ok) {
        throw new Error(jsonData);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const userProfile = () => {
    //getDate(token);

    switch (userType) {
      case "Normal user":
        return <UserProfil deleteSubmit={deleteUser}></UserProfil>;

      case "Admin":
        return <AdminProfil></AdminProfil>;

      case "Company user":
        return <CompanyProfil deleteSubmit={deleteUser}></CompanyProfil>;

      default:
        return <UserProfil deleteSubmit={deleteUser}></UserProfil>;
        return <div>Error: Kender ikke bruger typen</div>;
    }
    //return <CompanyProfil></CompanyProfil>
    //return <AdminProfil></AdminProfil>
    //return <UserProfil></UserProfil>;
  };

  return (
    <DeafultLayout>
      {showPopup && (
        <>
          <div className="blackout"></div>
          <div className="container-sm login-popup"></div>
        </>
      )}
      <div className="container-sm profile">
        {userProfile()}
        <ChangePassword token={token} userType={userType}></ChangePassword>
      </div>
    </DeafultLayout>
  );
}

export default Profile;

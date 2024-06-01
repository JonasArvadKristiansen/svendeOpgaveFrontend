import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import "../../scss/header.scss";
import profileIcon from "../../assets/profile.svg";
import facebookIcon from "../../assets/facebook.svg";
import googleIcon from "../../assets/google.svg";

import { Button } from "../uiElements/Buttons";
import LoginPopup from "../elementBlocks/popups/LoginPopUp";

interface Props {
  children?: React.ReactNode;
}

interface ExtraJwtInfo {
  user: {
    id: number;
    type: string;
  };
}

function Header(prop: Props) {
  //To use cookies and redirect
  const [cookies, setcookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const [userType, setUserType] = useState<string>("");

  //Checkes diffrent states depending on the user
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isCompanyUser, setIsCompanyUser] = useState<boolean>(false);

  //Enables popup to show
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);

  //Handles the logout state for the user
  const handleLogout = () => {
    removeCookie("Authorization");
    setIsLoggedIn(false);
    navigate("/");
  };

  //Handles the
  const handleTogglePopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  useEffect(() => {
    try {
      const token = cookies["Authorization"];
      if (token) {
        const decodeToken = jwtDecode<ExtraJwtInfo>(token);

        if (
          ["Company user", "Admin", "Normal user", "Google user", "Facebook user"].includes(
            decodeToken.user.type
          )
        ) {
          setUserType(decodeToken.user.type);
          setIsLoggedIn(true);
        }

        if (decodeToken.user.type == "Company user") {
          setIsCompanyUser(true);
        }
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }, [cookies]);

  return (
    <header>
      {showLoginPopup && <LoginPopup closePopup={handleTogglePopup} />}

      <div className="container-sm header">
        <div className="header__nav">
          <div>
            <h1 className="heading-1">JobConnect</h1>
            <p>Fin din nye karriere i dag</p>
          </div>
          <ul className="header__nav__list">
            <li>
              <Link to="/">Virksomheder</Link>
            </li>
            <li>
              <Link to="/jobposting">Jobopslag</Link>
            </li>
            {isCompanyUser && (
              <li>
                <Link to="/createJobpost">Opret jobopslag</Link>
              </li>
            )}
             {userType == "Admin" && (
              <li>
                <Link to="/statistic">Statestik</Link>
              </li>
            )}
          </ul>
        </div>

        {isLoggedIn ? (
          <div className="header__login">
            {isCompanyUser && (
              <Link to="/profile">
                <img src={profileIcon} alt="Profile ikon" />
              </Link>
            )}
            {userType == "Facebook user" && (
              <img src={facebookIcon} alt="Facebook ikon" />
            )}
            {userType == "Google user" && (
              <img src={googleIcon} alt="Google ikon" />
            )}

            <Button type="button" onClick={handleLogout}>
              Log ud
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            arialExpanded={showLoginPopup}
            arialHaspopup={true}
            onClick={handleTogglePopup}
          >
            Log ind
          </Button>
        )}
      </div>

      {prop.children}
    </header>
  );
}

export default Header;

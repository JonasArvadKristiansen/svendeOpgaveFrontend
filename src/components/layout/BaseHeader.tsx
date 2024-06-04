import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import "../../scss/layouts/header.scss";
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

function BaseHeader(prop: Props) {
  //To use cookies and redirect
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();

  //Save type of user is logged ind
  const [userType, setUserType] = useState<string>("");

  //Checkes diffrent states depending on the user
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  //Enables popup to show
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);

  useEffect(() => {
    const token = cookies["Authorization"];
    if (token) {
      const decodeToken = jwtDecode<ExtraJwtInfo>(token);
      if (
        [
          "Company user",
          "Admin",
          "Normal user",
          "Google user",
          "Facebook user",
        ].includes(decodeToken.user.type)
      ) {
        setUserType(decodeToken.user.type);
        setIsLoggedIn(true);
      }
    }
  }, [cookies]);

  //Handles the logout state for the user
  const handleLogout = () => {
    removeCookie("Authorization");
    setIsLoggedIn(false);
    navigate(0);
  };

  //Handles the toggle to show login popup
  const handleToggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <>
      <header>
        <div className="container-sm header">
          <div className="header__nav">
            <div>
              <h1 className="heading-1">JobConnect</h1>
              <p>Find din nye karriere i dag</p>
            </div>
            <ul className="header__nav__list">
              <li>
                <Link to="/">Virksomheder</Link>
              </li>
              <li>
                <Link to="/jobposting">Jobopslag</Link>
              </li>
              {userType == "Company user" && (
                <li>
                  <Link to="/createJobpost">Opret jobopslag</Link>
                </li>
              )}
              {userType == "Admin" && (
                <li>
                  <Link to="/statistic">Statistik</Link>
                </li>
              )}
            </ul>
          </div>

          {isLoggedIn ? (
            <div className="header__login">
              {(userType == "Normal user" ||
                userType == "Company user" ||
                userType == "Admin") && (
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
              onClick={handleToggleLoginPopup}
            >
              Log ind
            </Button>
          )}
        </div>
        {prop.children}
      </header>
      {showLoginPopup && <LoginPopup closePopup={handleToggleLoginPopup} />}
    </>
  );
}

export default BaseHeader;

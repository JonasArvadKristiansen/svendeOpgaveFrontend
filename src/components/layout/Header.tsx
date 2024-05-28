import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import "../../scss/header.scss";
import endpoint from "../../config.json";

import { Button } from "../uiElements/Buttons";
import Login from "../ElementBlocks/LoginPopUp";
import Icon from "../uiElements/Icon";

interface ExtraJwtInfo {
  user: {
    id: number;
    type: string;
  };
}

function Header() {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Checks if user logged in are companyes
  const [isCompany, setIsCompany] = useState<boolean>(false);

  const [serachValue, setSerachValue] = useState<string>("");

  //Checks if useres are logged in
  const [isLogedInd, setIsLogedInd] = useState<boolean>(false);

  //Enable login popup
  const [isLogedIndPopup, setIsLogedIndPopup] = useState<boolean>(false);

  //Enables the under header with serach
  const [canSearch, setCanSearch] = useState<boolean>(true);

  //Get, set and remove cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  //Redirect
  const navigate = useNavigate();

  //Logout as a user and deletes cookie
  const logout = () => {
    removeCookie("Authorization");
    setIsLogedInd(false);
    navigate("/");
  };

  const closePopup = () => {
    setIsLogedIndPopup(false);
  };

  const setNewSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(event.target.value);
  };

  useEffect(() => {
    //Tries to decode the jwt
    try {
      const token = cookies["Authorization"];
      if (token != undefined) {
        const decodeToken = jwtDecode<ExtraJwtInfo>(token);

        if (
          ["Company user", "Admin", "Normal user"].includes(
            decodeToken.user.type
          )
        ) {
          setIsLogedInd(true);
        }

        if (decodeToken.user.type == "Company user") {
          setIsCompany(true);
        }
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }, [cookies]);

  return (
    <header>
      {isLogedIndPopup && (
        <>
          <div className="blackout"></div>
          <div className="container-sm login-popup">
            <Login closePopup={closePopup} />
          </div>
        </>
      )}

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
            {isCompany && (
              <li>
                <Link to="/createJobpost">Opret jobopslag</Link>
              </li>
            )}
          </ul>
        </div>

        {isLogedInd ? (
          <div className="header__login">
            <Link to="/profile">
              <Icon src="profile.svg" alt="Profile ikon" />
            </Link>

            <Button type="button" onClick={logout}>
              Log ud
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            arialExpanded={isLogedIndPopup}
            arialHaspopup={true}
            onClick={() => {
              setIsLogedIndPopup(!isLogedIndPopup);
            }}
          >
            Log ind
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;

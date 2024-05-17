import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";


import "../../css/header.css";
import { Button } from "../UiElements/Buttons";
import Login from "../ElementBlocks/LoginPopUp";
import Icon from "../UiElements/Icon";

interface ExtraJwtInfo {
  user: {
    id: number;
    type: string;
  };
}

function Header() {
  //Checks if user logged in are companyes
  const [isCompany, setIsCompany] = useState(false);

  //Checks if useres are logged in
  const [isLogedInd, setIsLogedInd] = useState(false);

  //Enable login popup
  const [isLogedIndPopup, setIsLogedIndPopup] = useState(false);

  //Enables the under header with serach
  const [canSearch, setCanSearch] = useState(true);

  //Get, set and remove cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  //Redirect
  const navigate = useNavigate();

  //Logout as a user and deletes cookie
  const logout = () => {
    removeCookie("jwt-cookie");
    setIsLogedInd(false);
    navigate("/");
  };

  const closePopup = () => {
    setIsLogedIndPopup(false);
  };

  useEffect(() => {
    //Tries to decode the jwt
    try {
      const token = cookies["jwt-cookie"];
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
    } catch (error) {
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
            <p>Fin din nye career i dag</p>
          </div>
          <ul className="header__nav__list">
            <li>
              <Link to="/">Jobopslag</Link>
            </li>
            <li>
              <Link to="/">Virksomheder</Link>
            </li>
            {isCompany && (
              <li>
                <Link to="#">Opret jobopslag</Link>
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

      {canSearch && (
        <div className="under-header">
          <div className="container-sm under-header__search-container">
            <div className="under-header__search-container__input">
              <input
                type="text"
                placeholder="Søg efter virksomheder"
                aria-label="Søg efter virksomheder"
              />
              <Button type="button">Søg</Button>
            </div>
            <Button type="button">Filtere</Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

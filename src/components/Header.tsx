import { useState } from "react";
import { Link } from "react-router-dom";

import "../css/header.css";
import { Button } from "./UI/Buttons";
import Login from "./Elements/LoginPopUp";

function Header() {
  const [isCompany, setIsCompany] = useState(false);
  const [isLogedInd, setIsLogedInd] = useState(false);
  const [isLogedIndPopup, setIsLogedIndPopup] = useState(false);
  const [canSearch, setCanSearch] = useState(true);

  return (
    <>
      <header>
        {isLogedIndPopup && (
          <>
            <div className="blackout"></div>
            <div className="container-sm login-popup">
              <Login
                onClick={() => {
                  setIsLogedIndPopup(!isLogedIndPopup);
                }}
              />
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
                  <a href="#">Opret jobopslag</a>
                </li>
              )}
            </ul>
          </div>

          {isLogedInd ? (
            <div className="header__login">
              <a href="#">
                <img src="/profile.svg" alt="Profile ikon" />
              </a>

              <Button
                type="button"
                onClick={() => {
                  console.log("logud");
                }}
              >
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
    </>
  );
}

export default Header;

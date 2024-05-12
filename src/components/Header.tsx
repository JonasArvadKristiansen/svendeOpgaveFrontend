import { useState } from "react";
import "../css/header.css";
import Button from "./Elements/Button";
import Login from "./LoginPopUp";

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
                <a href="/">Jobopslag</a>
              </li>
              <li>
                <a href="/">Virksomheder</a>
              </li>

              {isCompany && (
                <li>
                  <a href="#">Opret jobopslag</a>
                </li>
              )}
            </ul>
          </div>

          {isLogedInd && (
            <div className="header__login">
              <a href="#">
                <img src="/profile.svg" alt="Profile ikon" />
              </a>

              <Button
                onClick={() => {
                  console.log("Logind");
                }}
              >
                Log ud
              </Button>
            </div>
          )}

          {!isLogedInd && (
            <Button
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
            <div className="container-sm search">
              <div className="under-header__search">
                <input
                  type="text"
                  placeholder="Søg efter virksomheder"
                  aria-label="Søg efter virksomheder"
                />
                <Button>Søg</Button>
              </div>
              <Button>Filtere</Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;

import Button from "./Button";
import "../css/header.css";
import { useState } from "react";

function Header() {
  const [isCompany, setIsCompany] = useState(false);
  const [isLogedInd, setIsLogedInd] = useState(true);
  const [canSearch, setCanSearch] = useState(true);

  return (
    <>
      <header>
        <div className="container-sm header">
          <div className="header__nav">
            <div>
              <h1 className="heading-1">JobConnect</h1>
              <p>Fin din nye career i dag</p>
            </div>
            <ul className="header__nav__list">
              <li>
                <a href="#">Jobopslag</a>
              </li>
              <li>
                <a href="#">Virksomheder</a>
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
              <a href="#"><img src="/profile.svg" alt="Profile icon" /></a>

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
              onClick={() => {
                console.log("Logind");
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
                <input type="text" placeholder="Søg efter virksomheder" aria-label="Søg efter virksomheder"/>
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

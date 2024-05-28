import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import "../../scss/header.scss";
import endpoint from "../../config.json";

import { Button } from "../uiElements/Buttons";
import LoginPopUp from "../ElementBlocks/LoginPopUp";
import Icon from "../uiElements/Icon";
import FilterPopup from "../ElementBlocks/FilterPopup";

interface Props {
  serchOnClickCompany?: (data: CompanyObject[]) => void;
  serchOnClickJobtype?: (data: JobPostingObject[]) => void;
  isCompany?: boolean;
}

interface CompanyObject {
  id: number;
  companyName: string;
  description: string;
  jobpostingCount: number;
}

interface JobPostingObject {
  id: number;
  companyName: string;
  title: string;
  deadline: string;
  address: string;
  description: string;
}

interface ExtraJwtInfo {
  user: {
    id: number;
    type: string;
  };
}

function FilterHeader(prop: Props) {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Checks if user logged in are companyes
  const [isCompany, setIsCompany] = useState<boolean>(false);

  const [serachValue, setSerachValue] = useState<string>("");

  //Checks if useres are logged in
  const [isLogedInd, setIsLogedInd] = useState<boolean>(false);

  //Enable login popup
  const [isLogedIndPopup, setIsLogedIndPopup] = useState<boolean>(false);
  const [isFilterPopup, setIsFilterPopup] = useState<boolean>(false);

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
    setIsFilterPopup(false);
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

  const searching = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      let response;

      if (prop.isCompany) {
        response = await fetch(
          `${endpoint.path}company/filter?search=${serachValue}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              accesstoken: accessToken,
            },
          }
        );
      } else {
        response = await fetch(
          `${endpoint.path}jobpost/filter?search=${serachValue}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              accesstoken: accessToken,
            },
          }
        );
      }

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      if (prop.serchOnClickCompany) {
        prop.serchOnClickCompany(jsonData.companys);
      }
      if (prop.serchOnClickJobtype) {
        prop.serchOnClickJobtype(jsonData.jobpostings);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const filterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      let jsonQury = "";
      const target = new FormData(event.currentTarget);
      let response;

      //Add values from form in a key, value
      for (const pair of target.entries()) {
        console.log(pair);
        switch (pair[0]) {
          case "jobtype":
            if (pair[1] !== "") {
              jsonQury += `jobtype=${String(pair[1])}&`;
            }
            break;
          case "deadlineFirst":
            if (pair[1] !== "") {
              jsonQury += `deadlineFirst=${String(pair[1])}&`;
            }
            break
          case "deadlineLast":
            if (pair[1] !== "") {
              jsonQury += `deadlineLast=${String(pair[1])}&`;
            }
            break;
          case "minSalary":
            if (pair[1] !== "") {
              jsonQury += `minSalary=${String(pair[1])}&`;
            }
            break;
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }

      console.log(jsonQury);

       if (prop.isCompany) {
        console.log('iscompany');
        
        response = await fetch(
          `${endpoint.path}company/filter?${jsonQury}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              accesstoken: accessToken,
            },
          }
        );
      } else {
        response = await fetch(
          `${endpoint.path}jobpost/filter?${jsonQury}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              accesstoken: accessToken,
            },
          }
        );
      }

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData)        
      }

      console.log(jsonData);
      

      if (prop.serchOnClickCompany) {
        prop.serchOnClickCompany(jsonData.companys);
      }
      if (prop.serchOnClickJobtype) {
        prop.serchOnClickJobtype(jsonData.jobpostings);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const popupToggle = () => {
    setIsFilterPopup(!isFilterPopup);
  };

  return (
    <header>
      {isLogedIndPopup && (
        <>
          <div className="blackout"></div>
          <div className="container-sm login-popup">
            <LoginPopUp closePopup={closePopup} />
          </div>
        </>
      )}

      {isFilterPopup && (
        <>
          <div className="blackout"></div>
          <div className="container-sm login-popup">
            <FilterPopup
              filterSubmit={filterSubmit}
              isForCompany={prop.isCompany ? prop.isCompany : false}
              closePopup={closePopup}
            />
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

      {canSearch && (
        <div className="under-header">
          <div className="container-sm under-header__search-container">
            <form
              className="under-header__search-container__input"
              onSubmit={searching}
            >
              <input
                type="text"
                placeholder="Søg efter virksomheder"
                aria-label="Søg efter virksomheder"
                value={serachValue}
                onChange={setNewSearchValue}
              />
              <Button type="submit">Søg</Button>
            </form>
            <Button type="button" onClick={popupToggle}>
              Filtere
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default FilterHeader;

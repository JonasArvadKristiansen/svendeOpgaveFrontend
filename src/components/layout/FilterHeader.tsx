import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

import "../../scss/header.scss";
import endpoint from "../../config.json";
import profileIcon from "../../assets/profile.svg";
import facebookIcon from "../../assets/facebook.svg"
import googleIcon from "../../assets/google.svg"

import { Button } from "../UiElements/Buttons";
import FilterPopup from "../ElementBlocks/popups/FilterPopup";
import LoginPopUp from "../ElementBlocks/popups/LoginPopUp";

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

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

interface ExtraJwtInfo {
  user: {
    id: number;
    type: string;
  };
}

function FilterHeader(prop: Props) {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const [serachValue, setSerachValue] = useState<string>("");
  const [isFilterPopup, setIsFilterPopup] = useState<boolean>(false);

  const [filterFailed, setFilterFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //To use cookies and redirect
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isCompanyUser, setIsCompanyUser] = useState<boolean>(false);

  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);

  const closePopup = () => {
    setIsFilterPopup(false);
  };

  const setNewSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(event.target.value);
  };

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
          ["Company user", "Admin", "Normal user"].includes(
            decodeToken.user.type
          )
        ) {
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
            break;
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

      if (jsonQury === "") {
        throw new Error("Du har ikke udfyldt nogen a punkterne");
      }

      if (
        !jsonQury.includes("deadlineFirst") &&
        jsonQury.includes("deadlineLast")
      ) {
        throw new Error("Deadline fra er ikke sat!");
      } else if (
        jsonQury.includes("deadlineFirst") &&
        !jsonQury.includes("deadlineLast")
      ) {
        throw new Error("Deadline til er ikke sat!");
      }

      if (prop.isCompany) {
        response = await fetch(`${endpoint.path}company/filter?${jsonQury}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
        });
      } else {
        response = await fetch(`${endpoint.path}jobpost/filter?${jsonQury}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
        });
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

      popupToggle();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFilterFailed({
          hasError: true,
          errorMesseage: error.message,
        });
        console.error(error.message);
      }
    }
  };

  const popupToggle = () => {
    setIsFilterPopup(!isFilterPopup);
  };

  return (
    <>
      {showLoginPopup && (
        <>
          <LoginPopUp closePopup={handleTogglePopup} />
        </>
      )}

      {isFilterPopup && (
        <>
          <FilterPopup
            failed={filterFailed}
            filterSubmit={filterSubmit}
            isForCompany={prop.isCompany ? prop.isCompany : false}
            closePopup={closePopup}
          />
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
            {isCompanyUser && (
              <li>
                <Link to="/createJobpost">Opret jobopslag</Link>
              </li>
            )}
          </ul>
        </div>

        {isLoggedIn ? (
          <div className="header__login">
            <Link to="/profile">
              <img src={profileIcon} alt="Profil ikon" />
            </Link>

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
    </>
  );
}

export default FilterHeader;

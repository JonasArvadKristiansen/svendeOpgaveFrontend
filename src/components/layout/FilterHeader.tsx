import { useState } from "react";
import BaseHeader from "./BaseHeader";
import FilterPopup from "../elementBlocks/popups/FilterPopup";
import endpoint from "../../config.json";
import { Button } from "../uiElements/Buttons";

interface Props {
  serchOnClickCompany?: (data: CompanyObject[]) => void;
  serchOnClickJobtype?: (data: JobPostingObject[]) => void;
  siteType: "company" | "jobpost";
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

function FilterHeader(prop: Props) {
  //Gets token to sendt with the feth from .env
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Checks for popup should show
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);

  //Hold serach values
  const [serachValue, setSerachValue] = useState<string>("");

  //Checks for failer in filter
  const [filterFailed, setFilterFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //Get new data out from submitting changes from popup filter
  const filterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const target = new FormData(event.currentTarget);
      let jsonQury = "";

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

      //Checks if it's an empty qury that is getting used
      if (jsonQury === "") {
        throw new Error("Du har ikke udfyldt nogen a punkterne");
      }

      //Check IF one of the deadlines ikke er blevet sat
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

      await fetchDate(
        event,
        `${endpoint.path}${prop.siteType}/filter?${jsonQury}`
      );

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

  //Get new data out from search value
  const searchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    fetchDate(
      event,
      `${endpoint.path}${prop.siteType}/filter?search=${serachValue}`
    );
  };

  //Fetch data depending on the url given
  const fetchDate = async (
    event: React.FormEvent<HTMLFormElement>,
    url: string
  ) => {
    try {
      event.preventDefault();

      //Get new filter data
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "accesstoken": accessToken,
        },
      });

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

  //Toggles the filter popup
  const popupToggle = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  //Makes the serche value update when typeing 
  const setNewSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(event.target.value);
  };

  return (
    <>
      <BaseHeader >
        <div className="under-header">
          <div className="container-sm under-header__search-container">
            <form
              className="under-header__search-container__input"
              onSubmit={searchSubmit}
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
      </BaseHeader>
      {showFilterPopup && (
        <>
          <FilterPopup
            failed={filterFailed}
            filterSubmit={filterSubmit}
            isForCompany={prop.siteType == "company" ? true : false}
            closePopup={popupToggle}
          />
        </>
      )}
    </>
  );
}

export default FilterHeader;

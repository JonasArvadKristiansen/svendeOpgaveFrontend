import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "../css/RegisterUser.css";
import DeafultLayout from "../layout/DeafultLayout";

import ErrorMessage from "../components/uiElements/ErrorMessage";
import RegisterUser from "../components/ElementBlocks/register/RegisterUser";
import RegisterCompany from "../components/ElementBlocks/register/RegisterCompany";
import ToggleUserType from "../components/ElementBlocks/ToggleUserType";

import endpoint from "../config.json";

interface JsonBodyUser {
  fullName: string;
  email: string;
  phonenumber: number;
  password: string;
  repeatPassword: string;
}

interface JsonBodyCompany {
  companyName: string;
  email: string;
  phonenumber: number;
  address: string;
  city: string;
  companyDescription: string;
  cvrNumber: number;
  numberOfEmployees: number;
  jobtypes: string[];
  password: string;
  repeatPassword: string;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

function CreateUser() {
  //Cookie and redirect
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["jwt-cookie"]);

  //Set password value and chceck if they are valid
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  //Jobtypes
  const [jobtypesList, setJobtypesList] = useState<string[]>([]);
  const [jobtypeValue, setJobtypeValue] = useState<string>("");

  //Phone value
  const [phoneValue, setPhoneValue] = useState<string>("");

  //Toggle between user to create
  const [isJobseeker, setIsJobseeker] = useState<boolean>(true);

  //Error handling
  const [registerFailed, setRegisterFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //Toggle between users to create
  const toggleUserSelect = () => {
    setRegisterFailed({ hasError: false, errorMesseage: '' });
    setIsJobseeker(!isJobseeker);
  };

  //Remove jobtypeValue from an array of jobs
  const removeJobElement = (key: number) => {
    setJobtypesList((jobtypesList) => {
      return jobtypesList.filter((_, i) => i !== key);
    });
  };

  //Add jobtypeValue into an array of jobs
  const addJobElement = () => {
    const value = jobtypeValue.trim();
    if (value.length < 1) {
      setJobtypeValue("");
      return;
    }
    setJobtypesList((jobtypesList) => [...jobtypesList, jobtypeValue]);
    setJobtypeValue("");
  };

  //Change jobtypeValue input value
  const changeJobValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobtypeValue(event.target.value);
  };

  //Limit phone number
  const phoneLimitOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 8) {
      setPhoneValue(value);
    }
  };

  //Submit POST create user
  const submitCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const target = new FormData(event.currentTarget);

      //Creates the jsonBody thats going to be sendt in the body
      const jsonBody: JsonBodyUser = {
        fullName: "",
        email: "",
        phonenumber: 0,
        password: "",
        repeatPassword: "",
      };

      //Add values from form in a key, value
      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "fullName":
            jsonBody.fullName = String(pair[1]);
            break;
          case "email":
            jsonBody.email = String(pair[1]);
            break;
          case "phonenumber":
            jsonBody.phonenumber = parseInt(String(pair[1]));
            break;
          case "password":
            jsonBody.password = String(pair[1]);
            break;
          case "repeatPassword":
            jsonBody.repeatPassword = String(pair[1]);
            break;
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }

      if (jsonBody.password != jsonBody.repeatPassword) {
        throw new Error("Adgangskoderne er ikke ens med hinanden!");
      }

      //Send the post request
      const response = await fetch(`${endpoint.path}user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonBody),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      //Makes the cookie with the jwt and navigatie to the frontpage
      setCookie("jwt-cookie", jsonData.token, {
        sameSite: "none",
        secure: true,
      });
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setRegisterFailed({
          hasError: true,
          errorMesseage: error.message,
        });
      }
    }
  };

  //Submit POST create company
  const submitCreateCompany = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();
      const target = new FormData(event.currentTarget);

      //Creates the jsonBody thats going to be sendt in the body
      const jsonBody: JsonBodyCompany = {
        companyName: "",
        email: "",
        phonenumber: 0,
        address: "",
        city: "",
        companyDescription: "",
        cvrNumber: 0,
        numberOfEmployees: 0,
        jobtypes: [""],
        password: "",
        repeatPassword: "",
      };

      //Add values from form in a key, value
      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "companyName":
            jsonBody.companyName = String(pair[1]);
            break;
          case "email":
            jsonBody.email = String(pair[1]);
            break;
          case "phonenumber":
            jsonBody.phonenumber = parseInt(String(pair[1]));
            break;
          case "address":
            jsonBody.address = String(pair[1]);
            break;
          case "city":
            jsonBody.city = String(pair[1]);
            break;
          case "companyDescription":
            jsonBody.companyDescription = String(pair[1]);
            break;
          case "cvrNumber":
            jsonBody.cvrNumber = parseInt(String(pair[1]));
            break;
          case "numberOfEmployees":
            jsonBody.numberOfEmployees = parseInt(String(pair[1]));
            break;
          case "jobtypes":
            jsonBody.jobtypes = jobtypesList;
            break;
          case "password":
            jsonBody.password = String(pair[1]);
            break;
          case "repeatPassword":
            jsonBody.repeatPassword = String(pair[1]);
            break;
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }

      if (jsonBody.password != jsonBody.repeatPassword) {
        throw new Error("Adgangskoderne er ikke ens med hinanden!");
      }

      //Send the post request
      const response = await fetch(`${endpoint.path}company/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonBody),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      //Makes the cookie with the jwt and navigatie to the frontpage
      setCookie("jwt-cookie", jsonData.token, {
        sameSite: "none",
        secure: true,
      });
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setRegisterFailed({
          hasError: true,
          errorMesseage: error.message
        })
      }
    }
  };

  return (
    <DeafultLayout>
      <div className="container-sm reg-user">
        <div className="reg-user__container">
          <h1 className="heading-1 reg-user__container__title">Opret bruger</h1>

          <ToggleUserType
            isBoolean={isJobseeker}
            toggleSelect={toggleUserSelect}
          />

          <ErrorMessage failed={registerFailed.hasError} erroMessage={registerFailed.errorMesseage} />

          {isJobseeker ? (
            <RegisterUser
              submitCreateUser={submitCreateUser}
              phoneLimitOnChange={phoneLimitOnChange}
              phoneValue={phoneValue}
              setPasswordValue={setPasswordValue}
              passwordValue={passwordValue}
              setIsPasswordValid={setIsPasswordValid}
              isPasswordValid={isPasswordValid}
            />
          ) : (
            <RegisterCompany
              submitCreateUser={submitCreateCompany}
              phoneLimitOnChange={phoneLimitOnChange}
              phoneValue={phoneValue}
              setPasswordValue={setPasswordValue}
              passwordValue={passwordValue}
              setIsPasswordValid={setIsPasswordValid}
              isPasswordValid={isPasswordValid}
              setJobtypesList={setJobtypesList}
              jobtypesList={jobtypesList}
              setJobtypeValue={setJobtypeValue}
              jobtypeValue={jobtypeValue}
              removeJobElement={removeJobElement}
              addJobElement={addJobElement}
              changeJobValue={changeJobValue}
            />
          )}
        </div>
      </div>
    </DeafultLayout>
  );
}

export default CreateUser;

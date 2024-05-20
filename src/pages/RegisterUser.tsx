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
  const [failed, setFailed] = useState<boolean>(false);
  const [erroMessage, setErroMessage] = useState<string>("");

  //Toggle between users to create
  const toggleUserSelect = () => {
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
    if (value.length > 8) {
      return;
    }
    setPhoneValue(value);
  };

  //Submit POST create user or company
  const submitCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = new FormData(event.currentTarget);

    let response;

    type JsonBody = {
      [key: string]: string | string[] | number | File;
    };
    const jsonBody: JsonBody = {};

    try {
      for (const pair of target.entries()) {
        jsonBody[pair[0]] = pair[1];
      }

      jsonBody.jobtypes = jobtypesList

      if (jsonBody.password != jsonBody.repeatPassword) {
        throw new Error("Adgangskoderne er ikke ens med hinanden!");
      }

      if (isJobseeker) {
        response = await fetch(`${endpoint.path}api/user/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonBody),
        });
      } else {
        response = await fetch(`${endpoint.path}api/company/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonBody),
        });
      }

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      setCookie("jwt-cookie", jsonData.token, {
        sameSite: "none",
        secure: true,
      });

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setErroMessage(error.message);
        setFailed(true);
      }
    }
  };

  return (
    <DeafultLayout>
      <div className="container-sm reg-user">
        <div className="reg-user__container">
          <h1 className="heading-1 reg-user__container__title">Opret bruger</h1>

          <ToggleUserType isBoolean={isJobseeker} toggleSelect={toggleUserSelect} />

          <ErrorMessage failed={failed} erroMessage={erroMessage} />

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
              submitCreateUser={submitCreateUser}
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

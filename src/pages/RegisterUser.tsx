import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "../css/RegisterUser.css";

import Input from "../components/UiElements/Input";
import { Button } from "../components/UiElements/Buttons";
import CreatePassword from "../components/ElementBlocks/CreatePassword";
import Jobtype from "../components/ElementBlocks/Jobtype";
import Textarea from "../components/UiElements/Textarea";
import ErrorMessage from "../components/UiElements/ErrorMessage";

import DeafultLayout from "../layout/DeafultLayout";
import endpoint from "../config.json";
import ToggleUserType from "../components/ElementBlocks/ToggleUserType";

function CreateUser() {
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["jwt-cookie"]);

  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const [phone, setPhone] = useState<string>("");

  const [jobtypesList, setJobtypesList] = useState<string[]>([]);
  const [jobtypeValue, setJobtypeValue] = useState<string>("");

  const [isJobseeker, setIsJobseeker] = useState<boolean>(true);

  const [failed, setFailed] = useState<boolean>(false);
  const [erroMessage, setErroMessage] = useState<string>("");

  //Remove jobtypeValue from an array of jobs
  const removeJobElement = (key: number) => {
    setJobtypesList((jobtypesList) => {
      return jobtypesList.filter((_, i) => i !== key);
    });
  };

  //Add jobtypeValue into an array of jobs
  const addJobElement = () => {
    const value = jobtypeValue.trim()
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

  //Checks to see if password is valid
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length < 8 || !/[A-Z]/.test(value) || !/\d/.test(value)) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
    setPassword(value);
  };

  //Limit phone number
  const phoneLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 8) {
      return;
    }

    setPhone(value);
  };

  //Toggle between users to create
  const toggleUserSelect = () => {
    setIsJobseeker(!isJobseeker);
  };

  //Submit POST create Jobseeker form
  const submitJobseekerForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const target = new FormData(event.currentTarget);

    type JsonBody = {
      [key: string]: string | number | File;
    };
    const jsonBody: JsonBody = {};

    try {
      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "fullName":
            jsonBody.fullName = pair[1];
            break;
          case "email":
            jsonBody.email = pair[1];
            break;
          case "phonenumber":
            jsonBody.phonenumber = pair[1];
            break;
          case "password":
            jsonBody.password = pair[1];
            break;
          case "repeatPassword":
            jsonBody.repeatPassword = pair[1];
            break;
          default:
            break;
        }
      }

      if (jsonBody.password != jsonBody.repeatPassword) {
        throw new Error("Adgangskoderne er ikke ens med hinanden!");
      }

      const response = await fetch(`${endpoint.path}createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonBody),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      setCookie("jwt-cookie", jsonData, {
        //maxAge: 900,
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

  //Submit POST create company form
  const submitCompanyForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = new FormData(event.currentTarget);

    type JsonBody = {
      [key: string]: string | string[] | number | File;
    };
    const jsonBody: JsonBody = {};

    try {
      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "companyName":
            jsonBody.companyName = pair[1];
            break;
          case "email":
            jsonBody.email = pair[1];
            break;
          case "phonenumber":
            jsonBody.phonenumber = parseInt(pair[1] as string);
            break;
          case "address":
            jsonBody.address = pair[1];
            break;
          case "city":
            jsonBody.city = pair[1];
            break;
          case "companyDescription":
            jsonBody.companyDescription = pair[1];
            break;
          case "cvrNumber":
            jsonBody.cvrNumber = parseInt(pair[1] as string);
            break;
          case "numberOfEmployees":
            jsonBody.numberOfEmployees = parseInt(pair[1] as string);
            break;
          case "jobtypes":
            jsonBody.jobtypes = jobtypesList;
            break;
          case "password":
            jsonBody.password = pair[1];
            break;
          case "repeatPassword":
            jsonBody.repeatPassword = pair[1];
            break;
          default:
            break;
        }
      }

      if (jsonBody.password != jsonBody.repeatPassword) {
        throw new Error("Adgangskoderne er ikke ens med hinanden!");
      }

      const response = await fetch(`${endpoint.path}createCompanyUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonBody),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      setCookie("jwt-cookie", jsonData, {
        //maxAge: 900,
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
          
          <ToggleUserType isJobseeker={isJobseeker} toggleUserSelect={toggleUserSelect}/>


          <ErrorMessage failed={failed} erroMessage={erroMessage} />

          {isJobseeker ? (
            <form method="post" onSubmit={submitJobseekerForm}>
              <Input type="text" name="fullName" required={true}>
                Fuld navn
              </Input>
              <Input type="email" name="email" required={true}>
                E-mail
              </Input>
              <Input
                onchange={phoneLimit}
                value={phone}
                pattern="[0-9]{8}"
                type="tel"
                name="phonenumber"
                required={true}
              >
                Telefon
              </Input>
              <CreatePassword
                password={password}
                isPasswordValid={isPasswordValid}
                passwordChange={passwordChange}
              />
              <Button type="submit">Opret jobsøger</Button>
            </form>
          ) : (
            <form method="post" onSubmit={submitCompanyForm}>
              <Input type="text" name="companyName" required={true}>
                Virksomhed navn
              </Input>
              <Input type="email" name="email" required={true}>
                E-mail
              </Input>
              <Input
                onchange={phoneLimit}
                value={phone}
                pattern="[0-9]{8}"
                type="tel"
                name="phonenumber"
                required={true}
              >
                Telefon
              </Input>
              <Input type="text" name="address" required={true}>
                Address
              </Input>
              <Input type="text" name="city" required={true}>
                By
              </Input>
              <Textarea name="companyDescription" required={true}>
                Beskrivelse
              </Textarea>
              <Input type="number" name="cvrNumber" min="1" required={true}>
                CVR nummer
              </Input>
              <Input
                type="number"
                name="numberOfEmployees"
                min="1"
                required={true}
              >
                Nummer af medarbejder
              </Input>

              <div>
                <label htmlFor="jobtypes">Jobtyper</label>
                <div className="reg-user__container__jobtype-input">
                  <input
                    name="jobtypes"
                    id="jobtypes"
                    type="text"
                    value={jobtypeValue}
                    onChange={changeJobValue}
                    placeholder="Jobtyper"
                  />
                  <Button type="button" onClick={() => addJobElement()}>
                    Opret
                  </Button>
                </div>
                <div className="reg-user__container__jobtype-list">
                  {jobtypesList.map((jobType, index) => (
                    <Jobtype
                      key={index}
                      deleteJobtype={() => removeJobElement(index)}
                    >
                      {jobType}
                    </Jobtype>
                  ))}
                </div>
              </div>

              <CreatePassword
                password={password}
                isPasswordValid={isPasswordValid}
                passwordChange={passwordChange}
              />

              <Button type="submit">Opret virksomhed</Button>
            </form>
          )}
        </div>
      </div>
    </DeafultLayout>
  );
}

export default CreateUser;

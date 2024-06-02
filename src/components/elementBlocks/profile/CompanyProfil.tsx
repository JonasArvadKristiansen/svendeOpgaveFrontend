import React, { useState, useEffect } from "react";

import Input from "../../uiElements/Input";
import { Button } from "../../uiElements/Buttons";
import Jobtype from "../Jobtype";
import ErrorMessage from "../../uiElements/ErrorMessage";

import endpoint from "../../../config.json";
import Textarea from "../../uiElements/Textarea";

interface Props {
  deleteSubmit: () => void;
  editUserComplete: () => void;
  data: CompanyData;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

interface CompanyData {
  companyName?: string;
  email?: string;
  phonenumber?: number;
  city?: string;
  description?: string;
  address?: string;
  numberOfEmployees?: number;
  cvrNumber?: number;
  jobtypes?: string | string[];
}

function CompanyProfil(prop: Props) {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Saves the orginal info
  const [originalInfo, setOriginalInfo] = useState<CompanyData>({
    companyName: "",
    email: "",
    phonenumber: 0,
    city: "",
    description: "",
    address: "",
    numberOfEmployees: 0,
    cvrNumber: 0,
    jobtypes: "",
  });

  //Set new value for inputs
  const [userInfo, setUserInfo] = useState<CompanyData>({
    companyName: "",
    email: "",
    phonenumber: 0,
    city: "",
    description: "",
    address: "",
    numberOfEmployees: 0,
    cvrNumber: 0,
    jobtypes: "",
  });

  //Chekcs the new and old joblist for change later
  const [jobtypesList, setJobtypesList] = useState<string[]>([]);
  const [originalJobtypesList, setOriginalJobtypesList] = useState<string[]>(
    []
  );

  // New input value to add a new jobtype
  const [jobtypeValue, setJobtypeValue] = useState<string>("");

  //Checks for failer in user
  const [userFailed, setUserFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //Set values from parent to the usestate
  useEffect(() => {
    const dataInfo = prop.data;

    if (
      dataInfo.jobtypes != undefined &&
      typeof dataInfo.jobtypes == "string"
    ) {
      setJobtypesList(dataInfo.jobtypes.split(","));
      setOriginalJobtypesList(dataInfo.jobtypes.split(","));
    }

    setOriginalInfo(prop.data);
    setUserInfo(prop.data);
  }, [prop.data]);

  //Remove jobtypeValue from an array of jobs
  const handleRemoveJobElement = (index: number) => {
    setJobtypesList((jobtypesList) => {
      return jobtypesList.filter((_, i) => i !== index);
    });
  };

  //Add jobtypeValue into an array of jobs
  const handleNewJobElement = () => {
    const value = jobtypeValue.trim();
    if (value.length < 1) {
      setJobtypeValue("");
      return;
    }
    setJobtypesList((jobtypesList) => [...jobtypesList, jobtypeValue]);
    setJobtypeValue("");
  };

  //Change jobtypeValue input value
  const onChangeJobValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobtypeValue(event.target.value);
  };

  //Makes it able to change textarea values after being given new ones
  const onChangeTextareaValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    try {
      const target = event.target;
      const inputName = target.name;
      const newValue = target.value;

      switch (inputName) {
        case "description":
          setUserInfo({ ...userInfo, description: newValue });
          break;
        default:
          throw new Error(`Dette input ${inputName} existere ikke`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setUserFailed({
          hasError: true,
          errorMesseage: error.message,
        });
        console.error(error.message);
      }
    }
  };

  //Makes it able to change input values after being given new ones
  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = event.target;
      const inputName = target.name;
      const newValue = target.value;

      switch (inputName) {
        case "companyName":
          setUserInfo({ ...userInfo, companyName: newValue });
          break;
        case "email":
          setUserInfo({ ...userInfo, email: newValue });
          break;
        case "phonenumber":
          if (newValue.length <= 8) {
            setUserInfo({ ...userInfo, phonenumber: parseInt(newValue) });
          }
          break;
        case "city":
          setUserInfo({ ...userInfo, city: newValue });
          break;
        case "address":
          setUserInfo({ ...userInfo, address: newValue });
          break;
        case "numberOfEmployees":
          setUserInfo({ ...userInfo, numberOfEmployees: parseInt(newValue) });
          break;
        case "cvrNumber":
          setUserInfo({ ...userInfo, cvrNumber: parseInt(newValue) });
          break;
        default:
          throw new Error(`Dette input ${inputName} existere ikke`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setUserFailed({
          hasError: true,
          errorMesseage: error.message,
        });
        console.error(error.message);
      }
    }
  };

  //Checks what inputs have changed to opdate info
  const submitInputChange = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const target = new FormData(event.currentTarget);

      const jsonBody: CompanyData = { };

      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "companyName":
            if (pair[1] != originalInfo.companyName) {
              jsonBody.companyName = String(pair[1]);
            }
            break;
          case "email":
            if (pair[1] != originalInfo.email) {
              jsonBody.email = String(pair[1]);
            }
            break;
          case "phonenumber":
            if (pair[1] != String(originalInfo.phonenumber)) {
              jsonBody.phonenumber = parseInt(String(pair[1]));
            }
            break;
          case "city":
            if (pair[1] != originalInfo.city) {
              jsonBody.city = String(pair[1]);
            }
            break;
          case "description":
            if (pair[1] != originalInfo.description) {
              jsonBody.description = String(pair[1]);
            }
            break;
          case "address":
            if (pair[1] != originalInfo.address) {
              jsonBody.address = String(pair[1]);
            }
            break;
          case "numberOfEmployees":
            if (pair[1] != String(originalInfo.numberOfEmployees)) {
              jsonBody.numberOfEmployees = parseInt(String(pair[1]));
            }
            break;
          case "cvrNumber":
            if (pair[1] != String(originalInfo.cvrNumber)) {
              jsonBody.cvrNumber = parseInt(String(pair[1]));
            }
            break;
          case "jobtypes":
            if (originalJobtypesList.join() != jobtypesList.join()) {
              jsonBody.jobtypes = jobtypesList;
            }
            break;
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }
      

      if (Object.keys(jsonBody).length <= 0) {
        throw new Error("Du har ikke lavet nogen ændinger!");
      }
      
      if (jobtypesList.length < 1) {
        throw new Error("Der skal mindst være en form for jobtype");
      }
      
      const response = await fetch(`${endpoint.path}company/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accesstoken: accessToken,
        },
        body: JSON.stringify(jsonBody),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      prop.editUserComplete();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setUserFailed({
          hasError: true,
          errorMesseage: error.message,
        });
        console.error(error.message);
      }
    }
  };

  return (
    <form className="profile__user" onSubmit={submitInputChange}>
      <ErrorMessage
        failed={userFailed.hasError}
        erroMessage={userFailed.errorMesseage}
      ></ErrorMessage>

      <Input
        type="text"
        name="companyName"
        value={userInfo.companyName}
        onchange={onChangeInputValue}
      >
        Company name
      </Input>

      <Input
        type="email"
        name="email"
        value={userInfo.email}
        onchange={onChangeInputValue}
      >
        E-mail
      </Input>

      <Input
        pattern="[0-9]{8}"
        type="tel"
        name="phonenumber"
        required
        value={String(userInfo.phonenumber)}
        onchange={onChangeInputValue}
      >
        Telefon nummer
      </Input>

      <Input
        type="text"
        name="city"
        value={userInfo.city}
        onchange={onChangeInputValue}
      >
        By
      </Input>

      <Textarea
        name="description"
        label="Beskrivelse"
        onChange={onChangeTextareaValue}
      >
        {userInfo.description === undefined
          ? ""
          : userInfo.description}
      </Textarea>

      <Input
        type="text"
        name="address"
        value={userInfo.address}
        onchange={onChangeInputValue}
      >
        Addresse
      </Input>

      <Input
        type="number"
        name="numberOfEmployees"
        value={String(userInfo.numberOfEmployees)}
        onchange={onChangeInputValue}
      >
        Number af medarbejder
      </Input>

      <Input
        type="number"
        name="cvrNumber"
        value={String(userInfo.cvrNumber)}
        onchange={onChangeInputValue}
      >
        CVR
      </Input>

      <div>
        <label htmlFor="jobtypes">Jobtyper</label>
        <div className="reg-user__container__jobtype-input">
          <input
            name="jobtypes"
            id="jobtypes"
            type="text"
            value={jobtypeValue}
            onChange={onChangeJobValue}
            placeholder="Jobtyper"
          />
          <Button type="button" onClick={handleNewJobElement}>
            Opret
          </Button>
        </div>

        <div className="reg-user__container__jobtype-list">
          {jobtypesList.map((jobType, index) => (
            <Jobtype key={index} deleteJobtype={() => handleRemoveJobElement(index)}>
              {jobType}
            </Jobtype>
          ))}
        </div>
      </div>

      <div className="profile__user__actions">
        <Button onClick={prop.deleteSubmit} delete type="button">
          Slet din bruger
        </Button>
        <Button type="submit">Opdatere din bruger</Button>
      </div>
    </form>
  );
}

export default CompanyProfil;

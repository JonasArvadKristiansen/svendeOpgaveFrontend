import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Input from "../../uiElements/Input";
import { Button } from "../../uiElements/Buttons";
import ErrorMessage from "../../uiElements/ErrorMessage";

import endpoint from "../../../config.json";

interface Props {
  token: string;
  userType: string;
}

type JsonBody = {
  [key: string]: string | number | File;
};

function ChangePassword(prop: Props) {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Remove cookie and navigate
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["Authorization"]);

  //Checks if password is valid to be used
  const [isValid, setIsValid] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState<string>("");

  //Fail check and messeage
  const [failed, setFailed] = useState<boolean>(false);
  const [erroMessage, setErroMessage] = useState<string>("");

  //Submit POST change users current password
  const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = new FormData(event.currentTarget);
    let jsonBody: JsonBody = {};
    let response;

    for (let pair of target.entries()) {
      jsonBody[pair[0]] = pair[1];
    }

    try {
      if (!isValid) {
        throw new Error("Adgangskoden opfylder ikke kravene");
      }

      if (jsonBody.newPassword != jsonBody.repeatNewPassword) {
        throw new Error("Adgangskoderne er ikke ens med hinanden!");
      }

      switch (prop.userType) {
        case "Normal user":
          response = await fetch(`${endpoint.path}user/password`, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${prop.token}`,
              accesstoken: accessToken,
            },
            body: JSON.stringify(jsonBody),
          });
          break;

        case "Company user":
          response = await fetch(`${endpoint.path}company/password`, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${prop.token}`,
              accesstoken: accessToken,
            },
            body: JSON.stringify(jsonBody),
          });
          break;

        default:
          throw new Error("Bruger type eksistere ikke");
      }

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      removeCookie("Authorization");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setErroMessage(error.message);
        setFailed(true);
      }
    }
  };

  //Checks to see if password is valid
  const validate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length < 8 || !/[A-Z]/.test(value) || !/\d/.test(value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    setNewPassword(value);
  };

  return (
    <div className="profile__changepass">
      <ErrorMessage erroMessage={erroMessage} failed={failed}></ErrorMessage>

      <form className="profile__changepass__form" onSubmit={changePassword}>
        <Input type="text" name="oldPassword" required={true}>
          Gammel Adgangskode
        </Input>
        <div>
          <label htmlFor="new-password">
            Ny adgangskode (adgangskoden skal mindst være <b>8 karaktere</b>{" "}
            skal mindst indholde<b> 1 nummer </b>og<b> 1 stort bogstav</b>)
          </label>
          <input
            className={isValid ? "failed" : undefined}
            value={newPassword}
            onChange={validate}
            id="new-password"
            type="text"
            name="newPassword"
            placeholder="Ny adgangskode"
            required
          />
        </div>
        {!isValid && (
          <p className="profile__changepass__form--failed">
            Adgangskoden opfylder ikke kravene
          </p>
        )}
        <Input type="password" name="repeatNewPassword" required={true}>
          Gentage adgangskode
        </Input>
        <Button type="submit">Opdatere adgangskode</Button>
      </form>
    </div>
  );
}

export default ChangePassword;

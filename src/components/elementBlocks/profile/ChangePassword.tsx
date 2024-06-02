import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Input from "../../uiElements/Input";
import { Button } from "../../uiElements/Buttons";
import ErrorMessage from "../../uiElements/ErrorMessage";

import endpoint from "../../../config.json";

interface Props {
  userType: string;
}

interface JsonBody {
  newPassword: string;
  repeatNewPassword: string;
  oldPassword: string;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

function ChangePassword(prop: Props) {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Remove cookie and navigate
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["Authorization"]);

  //Checks if password is valid to be used
  const [isValid, setIsValid] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState<string>("");

  //Error handling
  const [changePasswordFailed, setChangePasswordFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //Submit POST change users current password
  const submitChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      //Sets the jsonBody to send with the fetch
      const target = new FormData(event.currentTarget);
      let jsonBody: JsonBody = {
        newPassword: "",
        repeatNewPassword: "",
        oldPassword: "",
      };

      //Add values from form in a key, value
      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "newPassword":
            jsonBody.newPassword = String(pair[1]);
            break;
          case "repeatNewPassword":
            jsonBody.repeatNewPassword = String(pair[1]);
            break;
          case "oldPassword":
            jsonBody.oldPassword = String(pair[1]);
            break;
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }

      if (!isValid) {
        throw new Error("Adgangskoden opfylder ikke kravene");
      }

      if (jsonBody.newPassword != jsonBody.repeatNewPassword) {
        throw new Error("Adgangskoderne er ikke ens med hinanden!");
      }
    
      const response = await fetch(`${endpoint.path}${prop.userType == "Normal user"? "user": "company"}/password`, {
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

      removeCookie("Authorization");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setChangePasswordFailed({
          hasError: true,
          errorMesseage: error.message,
        });
      }
    }
  };

  //Checks to see if password is valid
  const onChangeValidatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <ErrorMessage
        failed={changePasswordFailed.hasError}
        erroMessage={changePasswordFailed.errorMesseage}
      ></ErrorMessage>

      <form className="profile__changepass__form" onSubmit={submitChangePassword}>
        <Input type="text" name="oldPassword" required>
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
            onChange={onChangeValidatePassword}
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
        <Input type="password" name="repeatNewPassword" CopiPast required>
          Gentage adgangskode
        </Input>
        <Button type="submit">Opdatere adgangskode</Button>
      </form>
    </div>
  );
}

export default ChangePassword;

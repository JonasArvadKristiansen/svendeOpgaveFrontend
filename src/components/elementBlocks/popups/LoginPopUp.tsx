import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../../scss/popup.scss";
import facebookIcon from "../../../assets/facebook.svg";
import googleIcon from "../../../assets/google.svg";
import closeIcon from "../../../assets/exit.svg";

import { Button, CloseButton } from "../../uiElements/Buttons";
import Input from "../../uiElements/Input";
import ErrorMessage from "../../uiElements/ErrorMessage";
import endpoint from "../../../config.json";
import ToggleUserType from "../ToggleUserType";
import ShowPopup from "./ShowPopup";

interface Props {
  closePopup: () => void;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

interface LoginInfo {
  email: string;
  password: string;
}

function LoginPopUp(prop: Props) {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Are user loggin ind as a Jobseeker or company
  const [isJobseeker, setIsJobseeker] = useState<boolean>(true);

  //Checks errors for logind
  const [loginFailed, setLoginFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //Helps to redirect
  const navigate = useNavigate();

  //Toggle between users to create
  const toggleUserSelect = () => {
    setIsJobseeker(!isJobseeker);
  };

  //Submit POST login form
  const submitLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Make form data to key value format
    const target = new FormData(event.currentTarget);

    const jsonBody: LoginInfo = {
      email: "",
      password: "",
    };

    try {
      //Add values from form inputs into jsonbbody
      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "email":
            jsonBody.email = String(pair[1]);
            break;
          case "password":
            jsonBody.password = String(pair[1]);
            break;
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }

      //Decides with fetch request it needs to run
      const response = await fetch(
        `${endpoint.path}${isJobseeker ? "user" : "company"}/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
          body: JSON.stringify(jsonBody),
        }
      );

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      prop.closePopup();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setLoginFailed({
          hasError: true,
          errorMesseage: error.message,
        });
      }
    }
  };

  return (
    <ShowPopup>
      <div
        className="popup"
        role="dialog"
        aria-modal="true"
        aria-label="Log ind som bruger popup"
      >
        <div className="popup__input">
          <div className="popup__input__header">
            <h2 className="heading-2">Log ind som bruger</h2>
            <CloseButton
              onClick={prop.closePopup}
              arialLabel="Luk login popup"
              src={closeIcon}
              alt="Luk ikon"
            />
          </div>

          <ErrorMessage
            failed={loginFailed.hasError}
            erroMessage={loginFailed.errorMesseage}
          />

          <ToggleUserType
            isBoolean={isJobseeker}
            toggleSelect={toggleUserSelect}
          />

          <form method="post" onSubmit={submitLoginForm}>
            <Input type="email" name="email" required>
              E-mail
            </Input>
            <Input type="password" name="password" required>
              Adgangskode
            </Input>
            <Button type="submit">Log ind</Button>
          </form>

          <div className="popup__input__box">
            <div>
              <Link to={`${endpoint}user/auth/facebook`}>
                <img src={facebookIcon} alt="Facebook ikon" />
                <p>Login med facebook</p>
              </Link>
            </div>
            <div>
              <Link to={`${endpoint}user/auth/google`}>
                <img src={googleIcon} alt="Google ikon" />
                <p>Login med Google</p>
              </Link>
            </div>
          </div>

          <Link to="/updatePassword">Glemt adgangskode?</Link>
        </div>

        <Link to="/createUser">Opret en ny bruger</Link>
      </div>
    </ShowPopup>
  );
}

export default LoginPopUp;

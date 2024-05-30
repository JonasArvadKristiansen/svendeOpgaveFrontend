import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../../scss/popup.scss";

import { Button, CloseButton } from "../../uiElements/Buttons";
import Input from "../../uiElements/Input";
import ErrorMessage from "../../uiElements/ErrorMessage";
import endpoint from "../../../config.json";
import ToggleUserType from "../ToggleUserType";
import ShowPopup from "./ShowPopup";

interface Props {
  closePopup: () => void;
}

function LoginPopUp(prop: Props) {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Are user loggin ind as a Jobseeker or company
  const [isJobseeker, setIsJobseeker] = useState<boolean>(true);

  //Checks for errors that orcurre
  const [failed, setFailed] = useState<boolean>(false);
  const [erroMessage, setErroMessage] = useState<string>("");

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
    
    type JsonBody = {
      [key: string]: string | number | File;
    };
    const jsonBody: JsonBody = {};

    try {
      //Add values from form inputs into jsonbbody
      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "email":
            jsonBody.email = pair[1];
            break;
          case "password":
            jsonBody.password = pair[1];
            break;
          default:
            break;
        }
      }

      //Decides with fetch request it needs to run
      let response;
      if (isJobseeker) {
        response = await fetch(`${endpoint.path}user/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
          body: JSON.stringify(jsonBody),
        });
      } else {
        response = await fetch(`${endpoint.path}company/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
          body: JSON.stringify(jsonBody),
        });
      }

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      prop.closePopup();
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
              src="src\assets\exit.svg"
              alt="Luk ikon"
            />
          </div>

          <ErrorMessage erroMessage={erroMessage} failed={failed} />

          <ToggleUserType
            isBoolean={isJobseeker}
            toggleSelect={toggleUserSelect}
          />

          <form method="post" onSubmit={submitLoginForm}>
            <Input type="email" name="email" required={true}>
              E-mail
            </Input>
            <Input type="password" name="password" required={true}>
              Adgnagskode
            </Input>
            <Button type="submit">Log ind</Button>
          </form>

          <div className="popup__input__box">
            <div>
              <a href="https://jonasarvad.com/api/user/auth/facebook">
                <img src="facebook.svg" alt="Facebook ikon" />
                <p>Login med facebook</p>
              </a>
            </div>
            <div>
              <Link to="https://jonasarvad.com/api/user/auth/google">
                <img src="google.svg" alt="Google ikon" />
                <p>Login med Google</p>
              </Link>
            </div>
          </div>

          <Link to="/updatePassword">Glemt adgangskode?</Link>
        </div>

        <Link to="/registerUser">Opret en ny bruger</Link>
      </div>
    </ShowPopup>
  );
}

export default LoginPopUp;

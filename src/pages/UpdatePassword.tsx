import React, { useEffect, useState } from "react";
import DeafultLayout from "../layout/DeafultLayout";
import Input from "../components/uiElements/Input";
import { Button } from "../components/uiElements/Buttons";
import ToggleUserType from "../components/elementBlocks/ToggleUserType";
import endpoint from "../config.json";
import ErrorMessage from "../components/uiElements/ErrorMessage";
import { useNavigate } from "react-router-dom";

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

function UpdatePassword() {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const navigate = useNavigate();

  const [isJobseeker, setIsJobseeker] = useState<boolean>(true);
  const [toggleUser, setToggleUser] = useState<string>("user");

  const [email, setEmail] = useState<string>("");

  //Error handling
  const [updateFailed, setUpdateFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //Toggle between if user is user or company to fetch the right one
  useEffect(() => {
    setToggleUser(isJobseeker ? "user" : "company");
  }, [isJobseeker]);

  //Toggle between users to create
  const handleUserSelect = () => {
    setIsJobseeker(!isJobseeker);
  };

  //On change set new email value
  const onChangeEmailValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };


  //Submit what user type needs changing password
  const submitChangePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();

      const response = await fetch(
        `${endpoint.path}${toggleUser}/resetPassword`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "accesstoken": accessToken,
          },
          body: JSON.stringify({ email: email }),
        }
      );

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }
      navigate("/");

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setUpdateFailed({
          hasError: true,
          errorMesseage: error.message
        })
      }
    }
  };

  return (
    <DeafultLayout>
      <div className="reg-user">
        <div className="reg-user__container">
          <h1 className="heading-1 reg-user__container__title">
            Glemt adgangskode
          </h1>
          <ToggleUserType
            isBoolean={isJobseeker}
            toggleSelect={handleUserSelect}
          />
          <ErrorMessage failed={updateFailed.hasError} erroMessage={updateFailed.errorMesseage}></ErrorMessage>
          <form onSubmit={submitChangePassword}>
            <Input onchange={onChangeEmailValue} type="text" name="email" required>
              Email
            </Input>
            <Button type="submit">Send email med ny adgangskode</Button>
          </form>
        </div>
      </div>
    </DeafultLayout>
  );
}

export default UpdatePassword;

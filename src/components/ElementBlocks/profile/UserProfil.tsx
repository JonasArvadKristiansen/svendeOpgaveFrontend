import { useEffect, useState } from "react";

import Input from "../../uiElements/Input";
import { Button } from "../../uiElements/Buttons";
import ErrorMessage from "../../uiElements/ErrorMessage";

import endpoint from "../../../config.json";
interface Props {
  deleteSubmit: () => void;
  editUserComplete: () => void;
  token: string;
  data: UserData;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

interface UserData {
  fullName?: string;
  email?: string;
  phonenumber?: number;
}

function UserProfil(prop: Props) {
  //Saves the orginal info
  const [originalInfo, setOriginalInfo] = useState<UserData>({
    fullName: "",
    email: "",
    phonenumber: 0,
  });

  //Replaces the new inputs from the user
  const [userInfo , setUserInfo ] = useState<UserData>({
    fullName: "",
    email: "",
    phonenumber: 0,
  });

  //Checks for failer in user
  const [userFailed, setUserFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //Set values from parent to the usestate
  useEffect(() => {
    const dataInfo = prop.data;
    setOriginalInfo(dataInfo);
    setUserInfo(dataInfo);
  }, [prop.data]);

  //Makes it able to change input values after being given new ones
  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = event.target;
      const inputName = target.name;
      const newValue = target.value;

      switch (inputName) {
        case "fullName":
          setUserInfo({ ...userInfo, fullName: newValue });
          break;
        case "email":
          setUserInfo({ ...userInfo, email: newValue });
          break;
        case "phonenumber":
          if (newValue.length <= 8) {
            setUserInfo({ ...userInfo, phonenumber: parseInt(newValue) });
          }
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

  //Checks to see if any value has change form the original data 
  const submitInputChange = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();
      const target = new FormData(event.currentTarget);

      const jsonBody: UserData = {};

      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "fullName":
            if (pair[1] != originalInfo.fullName) {
              jsonBody.fullName = String(pair[1]);
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
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }

      if (Object.keys(jsonBody).length <= 0) {
        throw new Error("Du har ikke lavet nogen ændinger!");
      }

      //Updates the users new values
      const response = await fetch(`${endpoint.path}user/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${prop.token}`,
          "Content-Type": "application/json",
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
    <>
      <form className="profile__user" onSubmit={submitInputChange}>
        <ErrorMessage
          failed={userFailed.hasError}
          erroMessage={userFailed.errorMesseage}
        ></ErrorMessage>

        <Input
          type="text"
          name="fullName"
          value={userInfo.fullName}
          onchange={handleInputChanges}
        >
          Fuld navn
        </Input>

        <Input
          type="email"
          name="email"
          value={userInfo.email}
          onchange={handleInputChanges}
        >
          E-mail
        </Input>

        <Input
          pattern="[0-9]{8}"
          type="tel"
          name="phonenumber"
          required={true}
          value={String(userInfo.phonenumber)}
          onchange={handleInputChanges}
        >
          Telefon nummer
        </Input>

        <div className="profile__user__actions">
          <Button onClick={prop.deleteSubmit} delete={true} type="button">
            Slet din bruger
          </Button>
          <Button type="submit">Opdatere din bruger</Button>
        </div>
      </form>
    </>
  );
}

export default UserProfil;

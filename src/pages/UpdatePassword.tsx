import React, { useEffect, useState } from "react";
import DeafultLayout from "../layout/DeafultLayout";
import Input from "../components/uiElements/Input";
import { Button } from "../components/uiElements/Buttons";
import ToggleUserType from "../components/ElementBlocks/ToggleUserType";
import endpoint from "../config.json";

function UpdatePassword() {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  const [isJobseeker, setIsJobseeker] = useState<boolean>(true);
  const [toggleUser, setToggleUser] = useState<string>("user");

  const [email, setEmail] = useState<string>("");

  //Toggle between users to create
  const toggleUserSelect = () => {
    setIsJobseeker(!isJobseeker);
  };
  
  const handleEmailValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    setToggleUser(isJobseeker ? "user" : "company");
  }, [isJobseeker]);

  const submitChangePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();

      console.log(`${endpoint.path}${toggleUser}/resetPassword`);
      

      console.log(email);
      


      const response = await fetch(
        `${endpoint.path}${toggleUser}/resetPassword`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
          body: JSON.stringify({email: email }),
        }
      );

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      console.log("complete ");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <DeafultLayout>
      <div className="container-sm reg-user">
        <div className="reg-user__container">
          <h1 className="heading-1 reg-user__container__title">
            Glemt adgangskode
          </h1>
          <ToggleUserType
            isBoolean={isJobseeker}
            toggleSelect={toggleUserSelect}
          />
          <form onSubmit={submitChangePassword}>
            <Input onchange={handleEmailValue} type="text" name="email">
              Email
            </Input>
            <Button type="submit">Log ind</Button>
          </form>
        </div>
      </div>
    </DeafultLayout>
  );
}

export default UpdatePassword;

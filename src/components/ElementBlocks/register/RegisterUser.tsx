import React from "react";
import Input from "../../UiElements/Input";
import CreatePassword from "./CreatePassword";
import { Button } from "../../UiElements/Buttons";

interface Props {
  //Submit function
  submitCreateUser: (event: React.FormEvent<HTMLFormElement>) => void;

  //Check phones lenght
  phoneLimitOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  phoneValue: string;

  //Check if pasword value is valid
  setPasswordValue: React.Dispatch<React.SetStateAction<string>>;
  passwordValue: string;

  //Check if pasword is valid
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordValid: boolean;
}

function RegisterUser(prop: Props) {
  return (
    <form method="post" onSubmit={prop.submitCreateUser}>
      <Input type="text" name="fullName" placeholder="Thomas Hansen" required>
        Fuld navn
      </Input>
      <Input type="email" name="email" required placeholder="Thomas@hotmail.dk">
        E-mail
      </Input>
      <Input
        onchange={prop.phoneLimitOnChange}
        value={prop.phoneValue}
        pattern="[0-9]{8}"
        type="tel"
        name="phonenumber"
        placeholder="45+ 12345678"
        required
      >
        Telefon
      </Input>
      <CreatePassword
        setIsPasswordValid={prop.setIsPasswordValid}
        isPasswordValid={prop.isPasswordValid}
        setPasswordValue={prop.setPasswordValue}
        passwordValue={prop.passwordValue}
      />
      <Button type="submit">Opret jobsøger</Button>
    </form>
  );
}

export default RegisterUser;

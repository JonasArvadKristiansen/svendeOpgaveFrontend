import { Button } from "../../uiElements/Buttons";
import Input from "../../uiElements/Input";
import Textarea from "../../uiElements/Textarea";
import Jobtype from "../Jobtype";
import CreatePassword from "./CreatePassword";

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


  setJobtypesList: React.Dispatch<React.SetStateAction<string[]>>;
  jobtypesList: string[];
  setJobtypeValue: React.Dispatch<React.SetStateAction<string>>;
  jobtypeValue: string;

  removeJobElement: (key: number) => void;
  addJobElement: () => void;
  changeJobValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function registerCompany(prop: Props) {
  return (
    <form method="post" onSubmit={prop.submitCreateUser}>
      <Input type="text" name="companyName" required={true}>
        Virksomhed navn
      </Input>
      <Input type="email" name="email" required={true}>
        E-mail
      </Input>
      <Input
        onchange={prop.phoneLimitOnChange}
        value={prop.phoneValue}
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
      <Input type="number" name="numberOfEmployees" min="1" required={true}>
        Nummer af medarbejder
      </Input>

      <div>
        <label htmlFor="jobtypes">Jobtyper</label>
        <div className="reg-user__container__jobtype-input">
          <input
            name="jobtypes"
            id="jobtypes"
            type="text"
            value={prop.jobtypeValue}
            onChange={prop.changeJobValue}
            placeholder="Jobtyper"
          />
          <Button type="button" onClick={() => prop.addJobElement()}>
            Opret
          </Button>
        </div>
        <div className="reg-user__container__jobtype-list">
          {prop.jobtypesList.map((jobType, index) => (
            <Jobtype key={index} deleteJobtype={() => prop.removeJobElement(index)}>
              {jobType}
            </Jobtype>
          ))}
        </div>
      </div>

      <CreatePassword
        setIsPasswordValid={prop.setIsPasswordValid}
        isPasswordValid={prop.isPasswordValid}
        setPasswordValue={prop.setPasswordValue}
        passwordValue={prop.passwordValue}
      />

      <Button type="submit">Opret virksomhed</Button>
    </form>
  );
}

export default registerCompany;

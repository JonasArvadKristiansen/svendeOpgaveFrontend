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

  //Sets job list op
  setJobtypesList: React.Dispatch<React.SetStateAction<string[]>>;
  jobtypesList: string[];
  setJobtypeValue: React.Dispatch<React.SetStateAction<string>>;
  jobtypeValue: string;

  //Funcktion for joblist
  removeJobElement: (key: number) => void;
  addJobElement: () => void;
  changeJobValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RegisterCompany(prop: Props) {
  return (
    <form method="post" onSubmit={prop.submitCreateUser}>
      <Input type="text" name="companyName" required placeholder="Tech Innovate Solutions">
        Virksomhed navn
      </Input>
      <Input type="email" name="email" required placeholder="info@techinnovatesolutions.com">
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
      <Input type="text" name="address" placeholder="H.C andersne vej 23" required>
        Address
      </Input>
      <Input type="text" name="city" placeholder="København" required>
        By
      </Input>
      <Textarea name="description" label="Beskrivelse" placeholder="Give en beskrivelse omkring dit firma..." required></Textarea>
      <Input type="number" name="cvrNumber" min="1" placeholder="12345678" required>
        CVR nummer
      </Input>
      <Input type="number" name="numberOfEmployees" min="1" placeholder="ca. 1" required>
        Nummer af medarbejder ca
      </Input>

      <div>
        <label htmlFor="jobtypes">Jobtyper (mindst 1 jobtype)</label>
        <div className="reg-user__container__jobtype-input">
          <input
            name="jobtypes"
            id="jobtypes"
            type="text"
            value={prop.jobtypeValue}
            onChange={prop.changeJobValue}
            placeholder="It-support"
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

export default RegisterCompany;

import { useEffect, useState } from "react";
import "../../css/createUser.css";

import Input from "../Elements/Input";
import Button from "../Elements/Button";
import CreatePassword from "../Elements/CreatePassword";
import Jobtype from "../Elements/Jobtype";

function CreateUser() {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [jobtypesList, setJobtypesList] = useState<string[]>([]);
  const [jobtypeValue, setJobtypeValue] = useState(String);

  const [isJobSeeker, setIsJobSeeker] = useState(false);

  //Remove jobtypeValue from an array of jobs
  const removeJobElement = (key: number) => {
    setJobtypesList((jobtypesList) => {
      return jobtypesList.filter((_, i) => i !== key);
    });
  };

  //Add jobtypeValue into an array of jobs
  const addJobElement = () => {
    if (jobtypeValue.length < 1) {
      return;
    }
    setJobtypesList((jobtypesList) => [...jobtypesList, jobtypeValue]);
    setJobtypeValue("");
  };

  //Change jobtypeValue input value
  const changeJobValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobtypeValue(event.target.value);
  };


  //Checks to see if password is valid
  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length < 8 || !/[A-Z]/.test(value) || !/\d/.test(value)) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
    setPassword(value);
  };

  //Toggle between users to create
  const toggleUserSelect = () => {
    setIsJobSeeker(!isJobSeeker);
  };

  return (
    <div className="container-sm reg-user">
      <div className="reg-user__container">
        <h1 className="heading-1">Opret bruger</h1>
        <div className="reg-user__container__selecter">
          <div className={isJobSeeker ? "reg-user__container__selecter--selected" : ""}>
            <label htmlFor="jobSeeker">Jobsøger</label>
            <input
              id="jobSeeker"
              type="checkbox"
              checked={isJobSeeker}
              onChange={toggleUserSelect}
            />
          </div>

          <div className={!isJobSeeker ? "reg-user__container__selecter--selected" : ""}>
            <label htmlFor="company">Virksomhed</label>
            <input
              id="company"
              type="checkbox"
              checked={!isJobSeeker}
              onChange={toggleUserSelect}
            />
          </div>
        </div>

        {isJobSeeker ? (
          <form action="#" method="post">
            <Input type="text" name="fullname">
              Fuld navn
            </Input>
            <Input type="email" name="email">
              E-mail
            </Input>
            <Input type="tel" name="phoneNumber">
              Telefon nummer
            </Input>

            <CreatePassword
              password={password}
              isPasswordValid={isPasswordValid}
              passwordChange={passwordChange}
            />

            <Button type="submit">Opret jobsøger</Button>
          </form>
        ) : (
          <form action="#" method="post">
            <Input type="text" name="company">
              Virksomhed navn
            </Input>
            <Input type="email" name="email">
              E-mail
            </Input>
            <Input type="tel" name="phoneNumber">
              Telefon nummer
            </Input>
            <Input type="text" name="address">
              Address
            </Input>
            <Input type="text" name="city">
              By
            </Input>
            <Input type="text" name="description">
              Beskrivelse
            </Input>
            <Input type="number" name="cvr">
              CVR nummer
            </Input>
            <Input type="number" name="workers">
              Nummer af medarbejder
            </Input>

            <div className="">
              <label htmlFor="jobtype">Jobtyper</label>
              <div className="reg-user__container__jobtype-input">
                <input
                  id="jobtype"
                  type="text"
                  value={jobtypeValue}
                  onChange={changeJobValue}
                  placeholder="Jobtyper"
                />
                <Button type="button" onClick={() => addJobElement()}>
                  Opret
                </Button>
              </div>
              <div className="reg-user__container__jobtype-list">
                {jobtypesList.map((jobType, index) => (
                  <Jobtype key={index} deleteJobtype={() => removeJobElement(index)}>
                    {jobType}
                  </Jobtype>
                ))}
              </div>
            </div>

            <CreatePassword
              password={password}
              isPasswordValid={isPasswordValid}
              passwordChange={passwordChange}
            />

            <Button type="submit">Opret virksomhed</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateUser;

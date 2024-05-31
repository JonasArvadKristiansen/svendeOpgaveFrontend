import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import DeafultLayout from "../layout/DeafultLayout";
import Input from "../components/UiElements/Input";
import { Button } from "../components/UiElements/Buttons";

import "../scss/pages/createJobpost.scss";
import endpoint from "../config.json";
import ErrorMessage from "../components/UiElements/ErrorMessage";

interface Jobpost {
  title: string;
  description: string;
  deadline: string;
  jobtype: string;
  salary: number;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

function CreateJobposting() {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  
  //Error handling
  const [registerFailed, setRegisterFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //Submit POST create user
  const submitJobpost = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const token = cookies["Authorization"];

      const target = new FormData(event.currentTarget);
      const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

      //Creates the jsonBody thats going to be sendt in the body
      const jsonBody: Jobpost = {
        title: "",
        description: "",
        deadline: "",
        jobtype: "",
        salary: 0,
      };

      //Add values from form in a key, value
      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "title":
            jsonBody.title = String(pair[1]);
            break;
          case "description":
            jsonBody.description = String(pair[1]);
            break;
          case "deadline":
            jsonBody.deadline = String(pair[1]);
            break;
          case "jobtype":
            jsonBody.jobtype = String(pair[1]);
            break;
          case "salary":
            jsonBody.salary = parseInt(String(pair[1]));
            break;
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }

      //Send the post request
      const response = await fetch(`${endpoint.path}jobpost/create`, {
        method: "POST",
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
      
      navigate(`/jobpostingInfo/${jsonData.id}`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setRegisterFailed({
          hasError: true,
          errorMesseage: error.message,
        });
      }
    }
  };

  return (
    <DeafultLayout>
      <div className="display-grid">
        <form className="display-grid__container" onSubmit={submitJobpost}>
          <h1 className="heading-1 title">Opret jobopslag</h1>
          <ErrorMessage
            failed={registerFailed.hasError}
            erroMessage={registerFailed.errorMesseage}
          />
          <Input type="text" name="title" placeholder="Software developer opsøges" required>
            Title
          </Input>
          <Input type="text" name="description" placeholder="Give en beskrivelse omkring hvad i leder efter og hvad medarbejdern skulle kunne..." required>
            Beskrivelse
          </Input>
          <Input type="date" name="deadline" required>
            Udløbnings dato
          </Input>
          <Input type="text" name="jobtype" placeholder="Software developer" required>
            Job type
          </Input>
          <Input type="number" name="salary" min="0" placeholder="0 kr" required>
            Betaling (Pr månded ca)
          </Input>
          <Button type="submit">Opret jobopslag</Button>
        </form>
      </div>
    </DeafultLayout>
  );
}

export default CreateJobposting;

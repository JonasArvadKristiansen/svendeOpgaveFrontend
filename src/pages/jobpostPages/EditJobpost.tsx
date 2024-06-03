import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import endpoint from "../../config.json";
import "../../scss/pages/jobpost.scss";

import DeafultLayout from "../../layout/DeafultLayout";
import Input from "../../components/uiElements/Input";
import { Button } from "../../components/uiElements/Buttons";
import ErrorMessage from "../../components/uiElements/ErrorMessage";

interface JobPostingObject {
  title?: string;
  description?: string;
  deadline?: string;
  jobtype?: string;
  salary?: number;
  jobpostingId?: number;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

function EditJobpost() {
  //Makes us able to use libary functions
  const params = useParams();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Sets af copi of the recived data
  const [originalInfo, setOriginalInfo] = useState<JobPostingObject>({
    title: "",
    description: "",
    deadline: "",
    jobtype: "",
    salary: 0,
    jobpostingId: 0,
  });

  //Gets the data and as well the updated values
  const [jobPostInfo, setJobPostInfo] = useState<JobPostingObject>({
    title: "",
    description: "",
    deadline: "",
    jobtype: "",
    salary: 0,
    jobpostingId: 0,
  });

  //Checks for failer in editer of jobpost
  const [editFailed, setEditFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  useEffect(() => {
    //Gets the data first thing connected to the parms id of jobpost
    const getData = async () => {
      try {
        const response = await fetch(
          `${endpoint.path}jobpost/info?jobpostingId=${params.id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "accesstoken": accessToken,
            },
          }
        );

        const jsonData = await response.json();

        if (!response.ok) {
          throw new Error(jsonData);
        }
        setOriginalInfo(jsonData.jobposting[0]);
        setJobPostInfo(jsonData.jobposting[0]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setEditFailed({
            hasError: true,
            errorMesseage: error.message,
          });
          console.error(error.message);
        }
      }

      getData();
    };
  }, [cookies]);

  //Checks what inputs have changed to opdate info
  const submitInputChange = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const target = new FormData(event.currentTarget);
      const jsonBody: JobPostingObject = {};

      jsonBody.jobpostingId = parseInt(String(params.id));

      for (const pair of target.entries()) {
        switch (pair[0]) {
          case "title":
            if (pair[1] != originalInfo.title) {
              jsonBody.title = String(pair[1]);
            }
            break;
          case "description":
            if (pair[1] != originalInfo.description) {
              jsonBody.description = String(pair[1]);
            }
            break;
          case "deadline":
            if (pair[1] != String(originalInfo.deadline)) {
              jsonBody.deadline = String(pair[1]);
            }
            break;
          case "jobtype":
            if (pair[1] != originalInfo.jobtype) {
              jsonBody.jobtype = String(pair[1]);
            }
            break;
          case "salary":
            if (pair[1] != String(originalInfo.salary)) {
              jsonBody.salary = parseInt(String(pair[1]));
            }
            break;
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }

      if (Object.keys(jsonBody).length <= 0) {
        throw new Error("Du har ikke lavet nogen ændinger!");
      }

      //Updates jobpost if the body is not empty
      const response = await fetch(`${endpoint.path}jobpost/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "accesstoken": accessToken,
        },
        body: JSON.stringify(jsonBody),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      navigate("..", { relative: "path" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setEditFailed({
          hasError: true,
          errorMesseage: error.message,
        });
        console.error(error.message);
      }
    }
  };

  //Makes it able to change input values after being given new input value
  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = event.target;
      const inputName = target.name;
      const newValue = target.value;

      //Goes though all the inputs from
      switch (inputName) {
        case "title":
          setJobPostInfo({ ...jobPostInfo, title: newValue });
          break;
        case "description":
          setJobPostInfo({ ...jobPostInfo, description: newValue });
          break;
        case "deadline":
          setJobPostInfo({ ...jobPostInfo, deadline: newValue });
          break;
        case "jobtype":
          setJobPostInfo({ ...jobPostInfo, jobtype: newValue });
          break;
        case "salary":
          setJobPostInfo({ ...jobPostInfo, salary: parseInt(newValue) });
          break;
        default:
          throw new Error(`Dette input ${inputName} existere ikke`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setEditFailed({
          hasError: true,
          errorMesseage: error.message,
        });
        console.error(error.message);
      }
    }
  };

  return (
    <DeafultLayout>
      <div className="display-grid">
        <form className="display-grid__container" onSubmit={submitInputChange}>
          <h1 className="heading-1 title">Opdatere jobopslag</h1>
          <ErrorMessage
            failed={editFailed.hasError}
            erroMessage={editFailed.errorMesseage}
          ></ErrorMessage>

          <Input
            type="text"
            name="title"
            placeholder="Software developer opsøges"
            required
            value={jobPostInfo.title}
            onchange={handleInputChanges}
          >
            Title
          </Input>
          <Input
            type="text"
            name="description"
            placeholder="Give en beskrivelse omkring hvad i leder efter og hvad medarbejdern skulle kunne..."
            required
            value={jobPostInfo.description}
            onchange={handleInputChanges}
          >
            Beskrivelse
          </Input>

          <Input
            type="date"
            name="deadline"
            required
            value={jobPostInfo.deadline!.split("T")[0]}
            onchange={handleInputChanges}
          >
            Udløbnings dato
          </Input>

          <Input
            type="text"
            name="jobtype"
            placeholder="Software developer"
            required
            value={jobPostInfo.jobtype}
            onchange={handleInputChanges}
          >
            Job type
          </Input>

          <Input
            type="number"
            name="salary"
            min="0"
            placeholder="0 kr"
            required
            value={jobPostInfo.salary}
            onchange={handleInputChanges}
          >
            Betaling (Pr månded ca)
          </Input>

          <Button type="submit">Opdatere jobopslag</Button>
        </form>
      </div>
    </DeafultLayout>
  );
}

export default EditJobpost;

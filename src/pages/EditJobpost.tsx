import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import endpoint from "../config.json";

import DeafultLayout from "../layout/DeafultLayout";
import Input from "../components/uiElements/Input";
import { Button } from "../components/uiElements/Buttons";
import ErrorMessage from "../components/uiElements/ErrorMessage";

import "../scss/pages/createJobpost.scss";

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
  const params = useParams();
  const [cookies] = useCookies();
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  const [token, setToken] = useState("");

  const [originalInfo, setOriginalInfo] = useState<JobPostingObject>({
    title: "",
    description: "",
    deadline: "",
    jobtype: "",
    salary: 0,
    jobpostingId: 0,
  });

  const [jobPostInfo, setJobPostInfo] = useState<JobPostingObject>({
    title: "",
    description: "",
    deadline: "",
    jobtype: "",
    salary: 0,
    jobpostingId: 0,
  });

  //Checks for failer in user
  const [userFailed, setUserFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  useEffect(() => {
    const token = cookies["Authorization"];
    setToken(token);

    const getData = async () => {
      try {
        const response = await fetch(
          `${endpoint.path}jobpost/info?jobpostingId=${params.id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              accesstoken: accessToken,
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
          setUserFailed({
            hasError: true,
            errorMesseage: error.message,
          });
          console.error(error.message);
        }
      }
    };

    getData();
  }, []);

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
          default:
            throw new Error(`Dette input ${pair[0]} existere ikke`);
        }
      }

      if (Object.keys(jsonBody).length <= 0) {
        throw new Error("Du har ikke lavet nogen ændinger!");
      }

      const response = await fetch(`${endpoint.path}jobpost/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accesstoken: accessToken,
        },
        body: JSON.stringify(jsonBody),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
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

  //Makes it able to change input values after being given new ones
  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = event.target;
      const inputName = target.name;
      const newValue = target.value;

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

  return (
    <DeafultLayout>
      <div className="display-grid">
        <form className="display-grid__container" onSubmit={submitInputChange}>
          <h1 className="heading-1 title">Opdatere jobopslag</h1>
          <ErrorMessage
            failed={userFailed.hasError}
            erroMessage={userFailed.errorMesseage}
          ></ErrorMessage>
          <Input
            type="text"
            name="title"
            value={jobPostInfo.title}
            onchange={handleInputChanges}
          >
            Title
          </Input>
          <Input
            type="text"
            name="description"
            value={jobPostInfo.description}
            onchange={handleInputChanges}
          >
            Beskrivelse
          </Input>

          <Input
            type="date"
            name="deadline"
            value={jobPostInfo.deadline!.split("T")[0]}
            onchange={handleInputChanges}
          >
            Udløbnings dato
          </Input>

          <Input
            type="text"
            name="jobtype"
            value={jobPostInfo.jobtype}
            onchange={handleInputChanges}
          >
            Job type
          </Input>

          {/*  <Input
            type="number"
            name="salary"
            min="0"
            step="0.001"
            required={true}
            value={jobPostList.salary}
            onchange={handleInputChanges}
          >
            Betaling
          </Input> */}

          <Button type="submit">Opdatere jobopslag</Button>
        </form>
      </div>
    </DeafultLayout>
  );
}

export default EditJobpost;
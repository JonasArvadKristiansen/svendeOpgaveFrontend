import React, { useState } from "react";

import endpoint from "../../../config.json";
import closeIcon from "../../../assets/exit.svg"

import ShowPopup from "./ShowPopup";
import Input from "../../UiElements/Input";
import ErrorMessage from "../../UiElements/ErrorMessage";
import { CloseButton, Button } from "../../UiElements/Buttons";
import Textarea from "../../UiElements/Textarea";

interface Props {
  closePopup: () => void;
  reciverEmail: string;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

interface ApplicationBody {
  reciver: string
  title: string
  text: string
  application: File
  cv: File
} 


function ApplicationPopup(prop: Props) {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Checks for failer in user
  const [applicationFailed, setApplicationFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  const submitApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = new FormData(event.currentTarget);

   /*  const jsonBody: ApplicationBody = {
      reciver: "",
      title: "",
      text: "",
      application: event.currentTarget.elements.item,
      cv: 0,
    }; */

    try {
      const response = await fetch(`${endpoint.path}user/sendEmail`, {
        method: "POST",
        credentials: "include",
        headers: {
          accesstoken: accessToken,
        },
        body: target,
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setApplicationFailed({
          hasError: true,
          errorMesseage: error.message,
        });
        console.error(error.message);
      }
    }
  };

  return (
    <ShowPopup>
      <div
        className="popup"
        role="dialog"
        aria-modal="true"
        aria-label="Log ind som bruger popup"
      >
        <div className="popup__input">
          <div className="popup__input__header">
            <h2 className="heading-2">Ansøgnings e-mail</h2>
            <CloseButton
              onClick={prop.closePopup}
              arialLabel="Luk login popup"
              src={closeIcon}
              alt="Luk ikon"
            />
          </div>

          <ErrorMessage
            failed={applicationFailed.hasError}
            erroMessage={applicationFailed.errorMesseage}
          />

          <form encType="multipart/form-data" onSubmit={submitApplication}>
            <Input type="email" name="receiver" value={prop.reciverEmail} readOnly required>
              Modtager
            </Input>
            <Input type="text" name="title" placeholder="Application for software developer Thomas Hansen" required>
              Title
            </Input>
            <Textarea label="Beskrivelse" name="text" placeholder="Give en kort beskrivelse omkring hvorfor du ansøger hos dem..." />
            <Input type="file" name="files" required>
              Ansøgnings
            </Input>
            <Input type="file" name="files" required>
              CV
            </Input>
            <Button type="submit">Send Ansøgning</Button>
          </form>
        </div>
      </div>
    </ShowPopup>
  );
}

export default ApplicationPopup;

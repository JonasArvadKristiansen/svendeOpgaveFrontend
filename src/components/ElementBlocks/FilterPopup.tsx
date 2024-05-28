import ShowPopup from "./ShowPopup";
import { Button, CloseButton } from "../uiElements/Buttons";
import ToggleUserType from "./ToggleUserType";
import { useState } from "react";
import Input from "../uiElements/Input";

interface Props {
  closePopup: () => void;
  filterSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isForCompany: boolean;
}

function FilterPopup(prop: Props) {
  return (
    <ShowPopup>
      <div
        className="login"
        role="dialog"
        aria-modal="true"
        aria-label="Filtere popup"
      >
        <div className="login__input">
          <div className="login__input__header">
            <h2 className="heading-2">Filtere</h2>
            <CloseButton
              onClick={prop.closePopup}
              arialLabel="Luk login popup"
              src="src\assets\exit.svg"
              alt="Luk ikon"
            />
          </div>

          <form onSubmit={prop.filterSubmit}>
            {prop.isForCompany ? (
              <Input name="jobtype" type="text">
                Jobtype
              </Input>
            ) : (
              <>
                <Input name="deadlineFirst" type="date">
                  Deadline
                </Input>
                <Input name="deadlineLast" type="date">
                  Deadline
                </Input>
                <Input name="minSalary" type="number" min="0">
                  Minimum løn
                </Input>
                <Input name="jobtype" type="text">
                  Jobtype
                </Input>
              </>
            )}
            <Button type="submit">Filtere</Button>
          </form>
        </div>
      </div>
    </ShowPopup>
  );
}

export default FilterPopup;

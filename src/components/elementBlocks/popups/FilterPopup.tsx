import ShowPopup from "./ShowPopup";
import { Button, CloseButton } from "../../uiElements/Buttons";
import Input from "../../uiElements/Input";
import ErrorMessage from "../../uiElements/ErrorMessage";

import closeIcon from "../../../assets/exit.svg"

interface Props {
  closePopup: () => void;
  filterSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isForCompany: boolean;
  failed: ErrorInfo;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

function FilterPopup(prop: Props) {
  return (
    <ShowPopup>
      <div
        className="popup"
        role="dialog"
        aria-modal="true"
        aria-label="Filtere popup"
      >
        <div className="popup__input">
          <div className="popup__input__header">
            <h2 className="heading-2">Filtere</h2>
            <CloseButton
              onClick={prop.closePopup}
              arialLabel="Luk filter popup"
              src={closeIcon}
              alt="Luk ikon"
            />
          </div>

          <form onSubmit={prop.filterSubmit}>
            <ErrorMessage
              failed={prop.failed.hasError}
              erroMessage={prop.failed.errorMesseage}
            ></ErrorMessage>

            {prop.isForCompany ? (
              <Input name="jobtype" type="text">
                Jobtype
              </Input>
            ) : (
              <>
                <Input name="deadlineFirst" type="date">
                  Deadline fra
                </Input>
                <Input name="deadlineLast" type="date">
                  Deadline til
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

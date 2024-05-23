import DeafultLayout from "../layout/DeafultLayout";
import Input from "../components/uiElements/Input";
import { Button } from "../components/uiElements/Buttons";

import "../scss/pages/createJobpost.scss";

function EditJobpost() {
  return (
    <DeafultLayout>
      <div className="display-grid">
        <form className="display-grid__container">
          <h1 className="heading-1 title">Opdatere jobopslag</h1>
          <Input type="text" name="title">
            Title
          </Input>
          <Input type="text" name="description">
            Beskrivelse
          </Input>
          <Input type="date" name="date">
            Udløbnings dato
          </Input>
          <Input type="text" name="jobtype">
            Job type
          </Input>
          <Button type="submit">Opdatere jobopslag</Button>
        </form>
      </div>
    </DeafultLayout>
  );
}

export default EditJobpost;

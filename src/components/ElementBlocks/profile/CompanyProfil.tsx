import Input from "../../uiElements/Input";
import { Button } from "../../uiElements/Buttons";
import Jobtype from "../Jobtype";

interface Props {
  deleteSubmit: () => void
}

function CompanyProfil(prop: Props) {
  return (
    <div className="profile__user" >
      <Input type="text" name="companyName">
        Company name
      </Input>

      <Input type="email" name="email">
        E-mail
      </Input>

      <Input type="tel" name="phone">
        Telefon nummer
      </Input>

      <Input type="text" name="city">
        By
      </Input>

      <Input type="text" name="address">
        Addresse
      </Input>

      <Input type="number" name="employee">
        Number af medarbejder
      </Input>

      <Input type="number" name="cvr">
        CVR
      </Input>

      <Jobtype
        deleteJobtype={() => {
          console.log("aaa");
        }}
      >
        test
      </Jobtype>

      <div className="profile__user__actions">
      <Button onClick={prop.deleteSubmit} delete={true} type="button">Slet din bruger</Button>
        <Button type="button">Opdatere din bruger</Button>
      </div>
    </div>
  );
}

export default CompanyProfil;
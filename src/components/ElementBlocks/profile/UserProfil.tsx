import Input from "../../uiElements/Input";
import { Button } from '../../uiElements/Buttons';

interface Props {
  deleteSubmit: () => void
}

function UserProfil(prop: Props) {
  return (
    <div className="profile__user">
      <Input type="text" name="fullname">
        Fuld navn
      </Input>
      <Input type="email" name="email">
        E-mail
      </Input>
      <Input type="tel" name="phone">
        Telefon nummer
      </Input>

      <div className="profile__user__actions">
        <Button onClick={prop.deleteSubmit} delete={true} type="button">Slet din bruger</Button>
        <Button type="button">Opdatere din bruger</Button>
      </div>
    </div>
  )
}

export default UserProfil
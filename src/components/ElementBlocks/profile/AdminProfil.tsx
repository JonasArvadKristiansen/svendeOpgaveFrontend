import Input from "../../uiElements/Input";
import { Button } from '../../uiElements/Buttons';


function AdminProfil() {
  return (
    <div className="profile__user">
      <Input type="email" name="email" placeholder='E-mail'>
        Email af bruger
      </Input>

      <Button type='button'>Ban email</Button>
    </div>
  )
}

export default AdminProfil
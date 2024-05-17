import Input from "../../UiElements/Input";
import { Button } from '../../UiElements/Buttons';


function AdminProfil() {
  return (
    <>
      <Input type="email" name="email" placeholder='E-mail'>
        Email af bruger
      </Input>

      <Button type='button'>Ban email</Button>
    </>
  )
}

export default AdminProfil
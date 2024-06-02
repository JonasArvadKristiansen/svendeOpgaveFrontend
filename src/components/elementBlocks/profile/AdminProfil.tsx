import Input from "../../uiElements/Input";
import { Button } from '../../uiElements/Buttons';
import ErrorMessage from "../../uiElements/ErrorMessage";

interface props {
  failed: ErrorInfo;
  enableDeleteEmailPopup: () => void;
  enableBanEmailPopup: () => void;
  setEmail: (email: string) => void;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

function AdminProfil(prop: props) {

  //Setting the email to the profile
  const onChangeEmail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value
    prop.setEmail(inputEmail)
  }

  return (
    <form className="profile__admin">
      <ErrorMessage failed={prop.failed.hasError} erroMessage={prop.failed.errorMesseage}/>

      <Input type="email" name="email" placeholder='E-mail' onchange={onChangeEmail}>
        Email af bruger
      </Input>

      <Button delete onClick={prop.enableDeleteEmailPopup} type='button'>Slet e-mail</Button>
      <Button delete onClick={prop.enableBanEmailPopup} type='button'>Ban e-mail</Button>
    </form>
  )
}

export default AdminProfil
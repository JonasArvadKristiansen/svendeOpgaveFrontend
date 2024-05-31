import Input from "../../UiElements/Input";
import { Button } from '../../UiElements/Buttons';
import ErrorMessage from "../../UiElements/ErrorMessage";

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

  const changeEmailInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value
    prop.setEmail(inputEmail)
  }

  return (
    <form className="profile__user">
      <ErrorMessage failed={prop.failed.hasError} erroMessage={prop.failed.errorMesseage}/>

      <Input type="email" name="email" placeholder='E-mail' onchange={changeEmailInput}>
        Email af bruger
      </Input>

      <Button delete onClick={prop.enableDeleteEmailPopup} type='button'>Slet e-mail</Button>
      <Button delete onClick={prop.enableBanEmailPopup} type='button'>Ban e-mail</Button>
    </form>
  )
}

export default AdminProfil
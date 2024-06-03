import Input from "../../uiElements/Input";
import { Button } from '../../uiElements/Buttons';

import ErrorMessage from "../../uiElements/ErrorMessage";
import SucceMessage from "../../uiElements/SucceMessage";

interface props {
  failed: ErrorInfo;
  succeeded: SucceedInfo;
  enableDeleteEmailPopup: () => void;
  enableBanEmailPopup: () => void;
  setEmail: (email: string) => void;
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}
interface SucceedInfo {
  hasSucceeded: boolean;
  succeedMessage: string;
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
      <SucceMessage succeeded={prop.succeeded.hasSucceeded} succeedMessage={prop.succeeded.succeedMessage}/>
      
      <Input type="email" name="email" placeholder='E-mail' onchange={onChangeEmail}>
        Email af bruger
      </Input>

      <Button delete onClick={prop.enableDeleteEmailPopup} type='button'>Slet bruger ud fra e-mail</Button>
      <Button delete onClick={prop.enableBanEmailPopup} type='button'>Ban bruger ud fra e-mail</Button>
    </form>
  )
}

export default AdminProfil
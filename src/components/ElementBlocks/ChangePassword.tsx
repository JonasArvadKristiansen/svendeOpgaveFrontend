import Input from "../UiElements/Input";
import { Button } from "../UiElements/Buttons";

const changePassword = () => {
  console.log('u gay');
}


function ChangePassword() {
  return (
    <form onSubmit={changePassword}>
      <Input type="text" name="password">
        Gammel Adgangskode
      </Input>

      <div>
        <label htmlFor="">Ny adgangskode</label>
        <p>
          Adgangskode (adgangskoden skal mindst være <b>8 karaktere</b> skal
          mindst indholde<b> 1 nummer </b>og<b> 1 stort bogstav</b>)
        </p>
        <input type="text" placeholder="Ny adgangskode" />
      </div>

      <Button type="submit">Opret adgangskode</Button>
    </form>
  );
}

export default ChangePassword;

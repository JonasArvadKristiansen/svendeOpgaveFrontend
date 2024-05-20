import Input from "../../uiElements/Input";

interface Props {
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordValid: boolean

  setPasswordValue: React.Dispatch<React.SetStateAction<string>>;
  passwordValue: string;
}

function CreatePassword(prop: Props) {
  //Checks to see if password is valid
  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length < 8 || !/[A-Z]/.test(value) || !/\d/.test(value)) {
      prop.setIsPasswordValid(false);
    } else {
      prop.setIsPasswordValid(true);
    }
    prop.setPasswordValue(value);
  };


  return (
    <>
      <div className="create-password">
        <div>
          <label htmlFor="password">
            Adgangskode (adgangskoden skal mindst være <b>8 karaktere</b> skal
            mindst indholde<b> 1 nummer </b>og<b> 1 stort bogstav</b>)
          </label>
          <input
            className={!prop.isPasswordValid ? "failed" : ""}
            value={prop.passwordValue}
            onChange={passwordOnChange}
            id="password"
            type="text"
            name="password"
            placeholder="Adgangskode"
            required
          />
          {!prop.isPasswordValid && (
            <p className="failed__text">Adgangskoden opfylder ikke kravene.</p>
          )}
        </div>
        <Input type="password" name="repeatPassword" required={true}>
          Gentage adgangskode
        </Input>
      </div>
    </>
  );
}

export default CreatePassword;

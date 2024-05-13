import Input from "./Input";

interface props {
  password: string;
  isPasswordValid: boolean;
  passwordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CreatePassword(prop: props) {
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
            value={prop.password}
            onChange={prop.passwordChange}
            id="password"
            type="text"
            name="password"
            placeholder="Adgangskode"
          />
          {!prop.isPasswordValid && (
            <p className="failed__text">Adgangskoden opfylder ikke kravene.</p>
          )}
        </div>
        <Input type="password" name="repeatPassword">
          Gentage adgangskode
        </Input>
      </div>
    </>
  );
}

export default CreatePassword;

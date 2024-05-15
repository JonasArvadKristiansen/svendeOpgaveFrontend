import { useState } from "react";
import { Link } from "react-router-dom";

import "../../css/login.css"
import { Button, CloseButton } from "../UI/Buttons";
import Input from "../UI/Input";

interface props {
  onClick: () => void;
}

function Login(prop: props) {
  const [isLoading, setIsLoading] = useState(false);
  const [didLoginFail, setDidLoginFail] = useState(false);
  
  return (
    <div className="login" role="dialog" aria-modal="true" aria-label="Log ind som bruger popup">
      {!isLoading && (
        <>
          <div className="login__input">
            <div className="login__input__header">
              <h2 className="heading-2">Log ind som bruger</h2>
              <CloseButton onClick={prop.onClick} arialLabel="Luk login popup" src="src\assets\exit.svg" alt="Luk ikon"/> 
            </div>

            <form action="#">
              {didLoginFail && (
                <div className="login__input--error">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eligendi velit ab, quidem, molestiae quia placeat tenetur
                    laudantium dolorum, necessitatibus quas quaerat inventore
                    minima. Dolorum quaerat nihil odio reiciendis doloremque
                    deleniti?
                  </p>
                </div>
              )}

              <Input type="text" name="email" placeholder="E-mail">
                E-mail
              </Input>
              <Input type="password" name="password" placeholder="Adgangskode">
                Adgnagskode
              </Input>
              <Button type="button">Log ind</Button>
            </form>

            <Link to="#">Glemt adgangskode?</Link>
          </div>

          <Link to="/registerUser">Opret en ny bruger</Link>
        </>
      )}
    </div>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import "../css/login.css";
import Button from "./Elements/Button";
import Input from "./Elements/Input";

interface props {
  onClick: () => void;
}

function Login(prop: props) {
  const [isLoading, setIsLoading] = useState(false);
  const [didLoginFail, setDidLoginFail] = useState(false);

  return (
    <div className="login" role="dialog" aria-modal="true">
      {!isLoading && (
        <>
          <div className="login__input">
            <div className="login__input__header">
              <h2 className="heading-2">Log ind som bruger</h2>
              <button aria-label="Luk login popup" onClick={prop.onClick}>
                <img src="/exit.svg" alt="Luk login popup" />
              </button>
            </div>

            <form action="#">
              {didLoginFail && (
                <div className="login__input__error">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eligendi velit ab, quidem, molestiae quia placeat tenetur
                    laudantium dolorum, necessitatibus quas quaerat inventore
                    minima. Dolorum quaerat nihil odio reiciendis doloremque
                    deleniti?
                  </p>
                </div>
              )}

              <Input id="email" type="text" name="email" placeholder="E-mail">
                E-mail
              </Input>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Adgangskode"
              >
                Adgnagskode
              </Input>
              <Button>Log ind</Button>
            </form>

            <a href="#">Glemt adgangskode?</a>
          </div>

          <a href="/reg-user">Opret en ny bruger</a>
        </>
      )}

      {isLoading && <p></p>}
    </div>
  );
}

export default Login;

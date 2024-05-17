import React from 'react'
import Input from "../../UiElements/Input";
import { Button } from '../../UiElements/Buttons';

function UserProfil() {
  return (
    <>
      <Input type="text" name="fullname">
        Fuld navn
      </Input>
      <Input type="email" name="email">
        E-mail
      </Input>
      <Input type="tel" name="phone">
        Telefon nummer
      </Input>

      <Button type='button'>Slet din bruger</Button>
      <Button type='button'>Opdatere din bruger</Button>
    </>
  )
}

export default UserProfil
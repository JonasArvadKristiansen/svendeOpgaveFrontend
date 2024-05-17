import React from 'react'
import Input from "../../UiElements/Input";
import { Button } from '../../UiElements/Buttons';
import Jobtype from '../Jobtype';

function CompanyProfil() {
  return (
    <>
     <Input type="text" name="companyName">
     Company name
      </Input>
      
      <Input type="email" name="email">
        E-mail
      </Input>
      
      <Input type="tel" name="phone">
        Telefon nummer
      </Input>

      <Input type="text" name="city">
        By
      </Input>
      
      <Input type="text" name="address">
        Addresse
      </Input>
      
      <Input type="number" name="employee">
        Number af medarbejder
      </Input>

      <Input type="number" name="cvr">
        CVR
      </Input> 

      <Jobtype deleteJobtype={() => {console.log('aaa');
      }}>test</Jobtype>

      <Button type='button'>Slet din bruger</Button>
      <Button type='button'>Opdatere din bruger</Button>
    </>
  )
}

export default CompanyProfil
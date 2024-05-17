import React from 'react'
import DeafultLayout from "../layout/DeafultLayout"
import AdminProfil from '../components/ElementBlocks/profile/AdminProfil'
import ChangePassword from '../components/ElementBlocks/ChangePassword'
import CompanyProfil from '../components/ElementBlocks/profile/CompanyProfil'
import UserProfil from '../components/ElementBlocks/profile/UserProfil'
import CreatePassword from '../components/ElementBlocks/CreatePassword'

function Profile() {
  return (
    <DeafultLayout>
      <div className='container-sm'>
       <CompanyProfil></CompanyProfil>

      </div>
    </DeafultLayout>
  )
}

export default Profile
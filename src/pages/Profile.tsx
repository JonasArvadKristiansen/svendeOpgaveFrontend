import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/uiElements/Buttons";

import DeafultLayout from "../layout/DeafultLayout";
import AdminProfil from "../components/ElementBlocks/profile/AdminProfil";
import ChangePassword from "../components/ElementBlocks/profile/ChangePassword";
import CompanyProfil from "../components/ElementBlocks/profile/CompanyProfil";
import UserProfil from "../components/ElementBlocks/profile/UserProfil";
import ShowPopup from "../components/ElementBlocks/ShowPopup";

import endpoint from "../config.json";
import "../css/profile.css";

interface ExtraJwtInfo {
  user: {
    id: number;
    type: string;
  };
}

interface ErrorInfo {
  hasError: boolean;
  errorMesseage: string;
}

interface UserData {
  fullName: string;
  email: string;
  phonenumber: number;
}

interface CompanyData {
  companyName: string;
  email: string;
  phonenumber: number;
  city: string;
  address: string;
  numberOfEmployees: number;
  cvrNumber: number;
  jobtypes: string;
}

function Profile() {
  //Make use of cookie and can navigate
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  //Sets the type of user and get the token
  const [userType, setUserType] = useState<string>("");
  const [token, setToken] = useState<string>("");

  //Shows diffrent popups
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  const [showAdminDeletesPopup, setShowAdminDeletesPopup] =
    useState<boolean>(false);
  //Show specific under the admin popup if ban or delete user
  const [isAdminBanning, setIsAdminBanning] = useState<boolean>(false);
  const [isAdminDeleting, setIsAdminDelete] = useState<boolean>(false);

  //Admin email to ban/remove
  const [adminSelectedEmail, setAdminSelectedEmail] = useState<string>("");

  //Checks for failer in Admin
  const [AdminFailed, setAdminFailed] = useState<ErrorInfo>({
    hasError: false,
    errorMesseage: "",
  });

  //Data from the backend to the userProfile component
  const [UserData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    phonenumber: 0,
  });

  //Data from the backend to the company component
  const [CompanyData, setompanyData] = useState<CompanyData>({
    companyName: "",
    email: "",
    phonenumber: 0,
    city: "",
    address: "",
    numberOfEmployees: 0,
    cvrNumber: 0,
    jobtypes: "",
  });

  useEffect(() => {
    const token = cookies["jwt-cookie"];
    setToken(token);

    const decodeToken = jwtDecode<ExtraJwtInfo>(token);
    const userType = decodeToken.user.type;
    setUserType(userType);

    //Get data from the backend to the profiles info
    const fetchData = async (userType: string) => {
      try {
        let response;

        //Go though the type the user are to get that users info
        switch (userType) {
          case "Normal user":
            response = await fetch(`${endpoint.path}user/info`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            break;
          case "Company user":
            response = await fetch(`${endpoint.path}company/info`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            break;
          case "Admin":
            response == "Admin";
            return;
          default:
            throw new Error(`Denne type ${userType} existere ikke`);
        }

        const jsonData = await response.json();

        if (!response.ok) {
          throw new Error(jsonData);
        }

        switch (userType) {
          case "Normal user":
            setUserData(jsonData[0]);
            break;
          case "Company user":
            setompanyData(jsonData.companyProfileData[0]);
            break;
          default:
            throw new Error(`Denne type ${userType} existere ikke`);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    fetchData(userType);
  }, [cookies]);

  //Small functions to enable popup for delete and editing

  //Handels the diffrent popup
  const handleDeletePopup = () => {
    setShowDeletePopup(!showDeletePopup);
  };
  const handleEditPopup = () => {
    setShowEditPopup(true);
  };
  const handleAdminPopup = () => {
    setShowAdminDeletesPopup(false);
    setIsAdminBanning(false);
    setIsAdminDelete(false);
  };

  const handleAdminBanningPopup = () => {
    setShowAdminDeletesPopup(true);
    setIsAdminBanning(true);
  };

  const handleAdminDeletingPopup = () => {
    setShowAdminDeletesPopup(true);
    setIsAdminBanning(true);
  };

  const handleSuccesPopup = () => {
    setShowSuccessPopup(!showSuccessPopup);
  };

  //Reload the current page
  const reloadCurrentPage = () => {
    navigate(0);
  };

  //Change the email thats going to be banned or removed by admin
  const handleEmailSelect = () => {
    (email: string) => setAdminSelectedEmail(email);
  };

  //Delete the user
  const deleteCurrentUser = async () => {
    try {
      let response;
      switch (userType) {
        case "Normal user":
          response = await fetch(`${endpoint.path}user/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          break;
        case "Company user":
          response = await fetch(`${endpoint.path}company/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          break;

        default:
          throw new Error("Bruger type eksistere ikke");
      }

      const test = response.json();
      console.log(test);

      if (!response.ok) {
        throw new Error("cringe");
      }

      removeCookie("jwt-cookie");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  //Admins submits to the backend
  const adminSubmitOptions = async (url: string, crud: string) => {
    try {
      const response = await fetch(url, {
        method: crud,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: adminSelectedEmail }),
      });

      const jsonObject = await response.json();

      if (!response.ok) {
        throw new Error(jsonObject);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setAdminFailed({
          hasError: true,
          errorMesseage: error.message,
        });
        handleAdminPopup();
      }
    }
  };

  //Find the user profile it needs to show
  const userProfile = () => {
    switch (userType) {
      case "Normal user":
        return (
          <UserProfil
            editUserComplete={handleEditPopup}
            deleteSubmit={deleteCurrentUser}
            token={token}
            data={UserData}
          />
        );

      case "Admin":
        return (
          <AdminProfil
            failed={AdminFailed}
            enableDeleteEmailPopup={handleAdminDeletingPopup}
            enableBanEmailPopup={handleAdminBanningPopup}
            setEmail={handleEmailSelect}
          ></AdminProfil>
        );

      case "Company user":
        return (
          <CompanyProfil
            editUserComplete={handleEditPopup}
            deleteSubmit={deleteCurrentUser}
            token={token}
            data={CompanyData}
          />
        );

      default:
        return <div>Error: Kender ikke bruger typen</div>;
    }
  };

  return (
    <DeafultLayout>
      {showDeletePopup && (
        <ShowPopup>
          <div className="delete-user">
            <p>Er du sikker på at du ville slette din bruger!</p>
            <div className="delete-user__buttons">
              <Button onClick={handleDeletePopup} type="button">
                Nej
              </Button>
              <Button onClick={deleteCurrentUser} delete={true} type="button">
                Slet bruger
              </Button>
            </div>
          </div>
        </ShowPopup>
      )}

      {showEditPopup && (
        <ShowPopup>
          <div className="edit-user">
            <p>Din profil er nu opdateret!</p>
            <Button onClick={reloadCurrentPage} type="button">
              Okay
            </Button>
          </div>
        </ShowPopup>
      )}

      {showAdminDeletesPopup && (
        <ShowPopup>
          <div className="ban-user">
            {isAdminBanning && (
              <>
                <p>Er du sikker på at du ville perma bande denne e-mail!</p>
                <div className="delete-user__buttons">
                  <Button onClick={handleAdminPopup} type="button">
                    Nej
                  </Button>
                  <Button
                    onClick={() =>
                      adminSubmitOptions(
                        `${endpoint.path}admin/banEmail`,
                        "POST"
                      )
                    }
                    delete={true}
                    type="button"
                  >
                    Ban email
                  </Button>
                </div>
              </>
            )}
            {isAdminDeleting && (
              <>
                <p>Er du sikker på at du ville slette denne e-mail!</p>
                <div className="ban-user__buttons">
                  <Button onClick={handleDeletePopup} type="button">
                    Nej
                  </Button>
                  <div className="ban-user__buttons__options">
                    <Button
                      onClick={() =>
                        adminSubmitOptions(
                          `${endpoint.path}admin/deleteUser`,
                          "DELETE"
                        )
                      }
                      delete={true}
                      type="button"
                    >
                      Slet en user
                    </Button>
                    <Button
                      onClick={() =>
                        adminSubmitOptions(
                          `${endpoint.path}admin/deleteCompany`,
                          "DELETE"
                        )
                      }
                      delete={true}
                      type="button"
                    >
                      Slet en virksomhed
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </ShowPopup>
      )}

      {showSuccessPopup && (
        <ShowPopup>
          <div className="edit-user">
            <p>Du har succesfuldt slettet emailen!</p>
            <Button onClick={handleSuccesPopup} type="button">
              Okay
            </Button>
          </div>
        </ShowPopup>
      )}

      <div className="container-sm profile">
        {userProfile()}
        <ChangePassword token={token} userType={userType}></ChangePassword>
      </div>
    </DeafultLayout>
  );
}

export default Profile;

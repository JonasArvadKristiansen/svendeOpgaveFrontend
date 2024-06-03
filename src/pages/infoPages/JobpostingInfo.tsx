import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import endpoint from "../../config.json";
import "../../scss/pages/contentInfo.scss";

import DeafultLayout from "../../layout/DeafultLayout";
import TextWithHead from "../../components/uiElements/TextSections";
import CompanyCard from "../../components/elementBlocks/contentCards/CompanyCard";
import { Button } from "../../components/uiElements/Buttons";
import ApplicationPopup from "../../components/elementBlocks/popups/ApplicationPopup";

interface JobPostingObject {
  title: string;
  jobtype: string;
  description: string;
  address: string;
  salary: number;
  deadLine: string;

  companyID: number;
  companyName: string;
  companyDescription: string;
  jobpostingCount: number;
}

interface ExtraJwtInfo {
  user: {
    id: number;
    type: string;
  };
}

function JobpostingInfo() {
  // Makes us able to use libary functions
  const params = useParams();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Checks if common user can send an aplication
  const [isCommonUser, setIsCommonUser] = useState<boolean>(false);

  //Saves the company email to be used in application reciver
  const [companyEmail, setCompanyEmail] = useState<string>("");

  //Checks for the owener to enable edit or delete of joppost
  const [isOwner, setIsOwner] = useState(false);

  //Enables popup to show
  const [showApplicationPopup, setShowApplicationPopup] =
    useState<boolean>(false);

  //Sets the values from the fetch to the html
  const [jobPostList, setJobPostList] = useState<JobPostingObject>({
    title: "",
    jobtype: "",
    description: "",
    address: "",
    salary: 0,
    deadLine: "",

    companyID: 0,
    companyName: "",
    companyDescription: "",
    jobpostingCount: 0,
  });

  useEffect(() => {
    //Gets information for joppost that matches the url parms id
    const getData = async () => {
      try {
        const token = cookies["Authorization"];
        const decodeToken = jwtDecode<ExtraJwtInfo>(token);
        const response = await fetch(
          `${endpoint.path}jobpost/info?jobpostingId=${params.id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              accesstoken: accessToken,
            },
          }
        );

        const jsonData = await response.json();        

        if (!response.ok) {
          throw new Error(jsonData);
        }

        //Checkes if the current user is the creater of the jobpost
        if (
          decodeToken.user.type == "Company user" &&
          decodeToken.user.id == jsonData.jobposting[0].companyID
        ) {
          setIsOwner(true);
        }

        setIsCommonUser(
          ["Normal user", "Google user", "Facebook user"].includes(
            decodeToken.user.type
          )
        );

        

        //Sets the usestates to give them data from the fetch
        setJobPostList(jsonData.jobposting[0]);
        setCompanyEmail(jsonData.jobposting[0].email);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };
    getData();
  }, [cookies]);

  //Handles the redirect to edit
  const handleRedirectToEdit = () => {
    navigate("editJobpost");
  };

  //Handles the toggle to show apply for aplication popup
  const handleTogglePopup = () => {
    setShowApplicationPopup(!showApplicationPopup);
  };

  //Handles the deletion of the jobpost
  const handleDeleteJobpost = async () => {
    try {
      const response = await fetch(`${endpoint.path}jobpost/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accesstoken: accessToken,
        },
        body: JSON.stringify({ jobpostingId: params.id }),
      });

      const jsonData = await response.json();
      navigate('/')

      if (!response.ok) {
        throw new Error(jsonData);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <DeafultLayout>
      {showApplicationPopup && (
        <ApplicationPopup
          reciverEmail={companyEmail}
          closePopup={handleTogglePopup}
        />
      )}

      <div className="container-sm content">
        <h1 className="heading-1 title">{jobPostList.title}</h1>
        <h2 className="heading-2 title">Jobtype: {jobPostList.jobtype}</h2>

        <div className="grid-layout-job">
          <div className="grid-layout-job__item-1">
            <TextWithHead
              header="Arbejds beskrivelse"
              text={jobPostList.description}
            />
          </div>

          <div className="grid-layout-job__item-2">
            <TextWithHead header="Addresse" text={jobPostList.address} />
            <TextWithHead
              header="Løn"
              text={`${jobPostList.salary} kr om måndeden`}
            />
          </div>
        </div>

        {isOwner && (
          <>
            <Button type="button" onClick={handleRedirectToEdit}>
              Redigere jobopslaget
            </Button>
            <Button delete type="button" onClick={handleDeleteJobpost}>
              Slet jobopslaget
            </Button>
          </>
        )}
        {isCommonUser && (
          <Button type="button" onClick={handleTogglePopup}>
            Ansøg denne stilling
          </Button>
        )}

        <h2 className="heading-2 title">Virksomhed</h2>
        <div className="content__blocks">
          <CompanyCard
            id={jobPostList.companyID}
            companyName={jobPostList.companyName}
            description={jobPostList.companyDescription}
            jobpostingCount={jobPostList.jobpostingCount}
            jobtypes={jobPostList.jobtype}
          />
          <div className="grid-layout-job__item-3__button"></div>
        </div>
      </div>
    </DeafultLayout>
  );
}

export default JobpostingInfo;

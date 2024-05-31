import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

import endpoint from "../config.json";
import "../scss/pages/contentInfo.scss";

import DeafultLayout from "../layout/DeafultLayout";
import TextWithHead from "../components/uiElements/TextSections";
import CompanyCard from "../components/elementBlocks/content/CompanyCard";
import { Button } from "../components/uiElements/Buttons";
import ApplicationPopup from "../components/elementBlocks/popups/ApplicationPopup";

interface JobPostingObject {
  title: string;
  jobtype: string;
  description: string;
  address: string;
  løn: number;
  deadLine: string;

  companyID: number,
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
  const params = useParams();
  const [cookies] = useCookies();
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  //Helps to redirect
  const navigate = useNavigate();

  const [companyEmail, setCompanyEmail] = useState<string>("");

  const [isOwner, setIsOwner] = useState(false);
  const [token, setToken] = useState(true);

  //Enables popup to show
  const [showApplicationPopup, setShowApplicationPopup] =
    useState<boolean>(false);

  const [jobPostList, setJobPostList] = useState<JobPostingObject>({
    title: "",
    jobtype: "",
    description: "",
    address: "",
    løn: 0,
    deadLine: "",

    companyID: 0,
    companyName: "",
    companyDescription: "",
    jobpostingCount: 0,
  });

  useEffect(() => {
    const token = cookies["Authorization"];
    setToken(token);
    const decodeToken = jwtDecode<ExtraJwtInfo>(token);

    const getData = async () => {
      try {
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

        if (decodeToken.user.id == jsonData.jobposting[0].companyID) {
          setIsOwner(true);
        }

        console.log(jsonData);
        

        setJobPostList(jsonData.jobposting[0]);
        setCompanyEmail(jsonData.jobposting[0].email);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    getData();
  }, []);

  //Handles the
  const handleRedirectToEdit = () => {
    navigate("editJobpost");
  };

  //Handles the
  const handleTogglePopup = () => {
    setShowApplicationPopup(!showApplicationPopup);
  };

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
              text={jobPostList.companyDescription}
            />
          </div>

          <div className="grid-layout-job__item-2">
            <TextWithHead header="Addresse" text={jobPostList.address} />
            <TextWithHead header="Løn" text="12.000 om måndeden" />
          </div>
        </div>

        {isOwner ? (
          <>
            <Button type="button" onClick={handleRedirectToEdit}>
              Redigere jobopslaget
            </Button>
            <Button delete type="button" onClick={handleDeleteJobpost}>
              Slet jobopslaget
            </Button>
          </>
        ) : (
          <Button type="button" onClick={handleTogglePopup}>
            Ansøg denne stilling
          </Button>
        )}

        <h2 className="heading-2 title">Virksomhed</h2>
        <div className="content__blocks">
          <CompanyCard
            id={jobPostList.companyID}
            companyName={jobPostList.companyName}
            description={jobPostList.description}
            jobpostingCount={jobPostList.jobpostingCount}
          />
          <div className="grid-layout-job__item-3__button"></div>
        </div>
      </div>
    </DeafultLayout>
  );
}

export default JobpostingInfo;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import endpoint from "../config.json";
import "../scss/pages/contentInfo.scss";

import DeafultLayout from "../layout/DeafultLayout";
import TextWithHead from "../components/uiElements/TextSections";
import CompanyCard from "../components/ElementBlocks/content/CompanyCard";
import { Button } from "../components/uiElements/Buttons";
import ApplicationPopup from "../components/ElementBlocks/popups/ApplicationPopup";

interface JobPostingObject {
  title: string;
  jobtype: string;
  description: string;
  address: string;
  løn: number;
  deadLine: string;

  companyName: string;
  companyDescription: string;
  jobpostingCount: number;
}

function JobpostingInfo() {
  const params = useParams();
  const [cookies] = useCookies();
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  const [isOwner, setIsOwner] = useState(true);
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

    companyName: "",
    companyDescription: "",
    jobpostingCount: 0,
  });

  useEffect(() => {
    const token = cookies["Authorization"];
    setToken(token);

    const getData = async () => {
      try {
        const response = await fetch(
          `${endpoint.path}jobpost/info?jobpostingId=${params.id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              accesstoken: accessToken,
            },
          }
        );
        const jsonData = await response.json();

        if (!response.ok) {
          throw new Error(jsonData);
        }

        console.log(jsonData);

        setJobPostList(jsonData.jobposting[0]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    getData();
  }, []);

  //Handles the
  const handleTogglePopup = () => {
    setShowApplicationPopup(!showApplicationPopup);
  };

  const deleteJobpost = async () => {
    try {
      const response = await fetch(`${endpoint.path}jobpost/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        <ApplicationPopup reciverEmail="test@mail.dk" closePopup={handleTogglePopup} />
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

          <div className="grid-layout-job__item-3">
            <h2 className="heading-2 title">Virksomhed</h2>
            <CompanyCard
              id={parseInt(String(params.id))}
              companyName={jobPostList.companyName}
              description={jobPostList.description}
              jobpostingCount={jobPostList.jobpostingCount}
            />
            <div className="grid-layout-job__item-3__button">
              {isOwner && (
                <>
                  <Link to={"editJobpost"}>Redigere</Link>
                  <Button delete={true} type="button" onClick={deleteJobpost}>
                    Slet opslag
                  </Button>
                </>
              )}
              <Button type="button" onClick={handleTogglePopup}>
                test popup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DeafultLayout>
  );
}

export default JobpostingInfo;

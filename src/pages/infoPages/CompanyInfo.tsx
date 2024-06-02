import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import endpoint from "../../config.json";
import "../../scss/pages/contentInfo.scss";

import DeafultLayout from "../../layout/DeafultLayout";
import TextSections from "../../components/uiElements/TextSections";
import JobPostingCard from "../../components/elementBlocks/contentCards/JobPostingCard";

import ApplicationPopup from "../../components/elementBlocks/popups/ApplicationPopup";
import { Button } from "../../components/uiElements/Buttons";

interface CompanyObject {
  companyName: string;
  description: string;
  email: string;
  phonenumber: number;
  address: string;
  city: string;
  cvrNumber: number;
  numberOfEmployees: number;
  jobtypes: string;
}

interface JobPostingObject {
  id: number;
  companyName: string;
  title: string;
  deadline: string;
  address: string;
  description: string;
}

function CompanyInfo() {
  //Gets to get data from cookie, params and token 
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const [cookies] = useCookies();
  const params = useParams();

  //Enables popup to show
  const [showApplicationPopup, setShowApplicationPopup] =
    useState<boolean>(false);

  //Saves the company email to be used in application reciver
  const [companyEmail, setCompanyEmail] = useState<string>("");

  //Gets the array of jobtypes
  const [jobpostList, setJobpostList] = useState<JobPostingObject[]>([]);

  //Sets the values from the fetch to the html
  const [companyList, setCompanyList] = useState<CompanyObject>({
    companyName: "",
    description: "",
    email: "",
    phonenumber: 0,
    address: "",
    city: "",
    cvrNumber: 0,
    numberOfEmployees: 0,
    jobtypes: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${endpoint.path}company/info?companyID=${params.id}`,
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
        
        setJobpostList(jsonData.jobpostingsData);
        setCompanyList(jsonData.companyProfileData[0]);
        setCompanyEmail(jsonData.companyProfileData[0].email);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };
    getData();
  }, [cookies]);

  //Handles the toggle to show apply for aplication popup
  const handleTogglePopup = () => {
    setShowApplicationPopup(!showApplicationPopup);
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
        <h1 className="heading-1 title">{companyList.companyName}</h1>

        <div className="grid-layout-com">
          <div className="grid-layout-com__1">
            <TextSections header="Om us" text={companyList.description} />
          </div>

          <div className="grid-layout-com__2">
            <div className="grid-layout-com__2__item-1">
              <TextSections header="Addresse" text={companyList.address} />
            </div>
            <div className="grid-layout-com__2__item-2">
              <TextSections header="CVR nummer" text={companyList.cvrNumber} />
            </div>
            <div className="grid-layout-com__2__item-1">
              <TextSections
                header="Telefon nummer"
                text={`45+ ${companyList.phonenumber}`}
              />
            </div>

            <div className="grid-layout-com__2__item-2">
              <TextSections
                header="Medarbejder"
                text={`ca. ${companyList.numberOfEmployees}`}
              />
            </div>
            <div className="grid-layout-com__2__item-1">
              <TextSections header="Email" text={companyList.email} />
            </div>
          </div>

          <div className="grid-layout-com__3">
            <TextSections header="Job tags" text="" />

            {companyList.jobtypes.split(",").length > 1 ? (
              companyList.jobtypes.split(",").map((type, index) => (
                <div key={index} className="jobtype">
                  <p>{type}</p>
                </div>
              ))
            ) : (
              <p>Der er ikke sat nogen jobtytper</p>
            )}
          </div>
        </div>

        <Button type="button" onClick={handleTogglePopup}>
          Ansøg uopfordret
        </Button>

        <h1 className="heading-1 title">Jobopslag</h1>
        <div className="content__blocks">
          {Object.keys(jobpostList).length > 0 &&
            jobpostList.map((job, index) => (
              <JobPostingCard
                key={index}
                id={job.id}
                companyName={job.companyName}
                title={job.title}
                deadline={job.deadline}
                address={job.address}
                description={job.description}
              ></JobPostingCard>
            ))}
        </div>
      </div>
    </DeafultLayout>
  );
}

export default CompanyInfo;

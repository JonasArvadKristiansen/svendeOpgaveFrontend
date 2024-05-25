import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import endpoint from "../config.json";

import DeafultLayout from "../layout/DeafultLayout";
import TextWithHead from "../components/uiElements/TextSections";
import "../scss/pages/contentInfo.scss";
import CopmanyCard from "../components/ElementBlocks/content/copmanyCard";
import { Button } from "../components/uiElements/Buttons";

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
    const token = cookies["jwt-cookie"];
    setToken(token);

    const getData = async () => {
      try {
        const response = await fetch(
          `${endpoint.path}jobpost/info?jobpostingId=${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              access_token: accessToken,
            },
          }
        );

        const jsonData = await response.json();

        if (!response.ok) {
          throw new Error(jsonData);
        }

        setJobPostList(jsonData.jobposting[0]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    getData();
  }, []);

  const deleteJobpost = async () => {
    try {
      const response = await fetch(`${endpoint.path}jobpost/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          access_token: accessToken,
        },
        body: JSON.stringify({ jobpostingId: params.id }),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData);
      }

      console.log("complete delte");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <DeafultLayout>
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
            <CopmanyCard
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
            </div>
          </div>
        </div>
      </div>
    </DeafultLayout>
  );
}

export default JobpostingInfo;

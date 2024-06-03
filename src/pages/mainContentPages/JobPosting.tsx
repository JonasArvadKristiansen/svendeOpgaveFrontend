import { useEffect, useState } from "react";

import endpoint from "../../config.json";
import "../../scss/pages/content.scss";

import FilterHeader from "../../components/layout/FilterHeader";
import Footer from "../../components/layout/Footer";

import JobPostingCard from "../../components/elementBlocks/contentCards/JobPostingCard";
import NotFoundCard from "../../components/elementBlocks/contentCards/NotFoundCard";

interface JobPostingObject {
  id: number;
  companyName: string;
  title: string;
  deadline: string;
  address: string;
  description: string;
  jobtype: string;
}

function JobPosting() {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  const [jobpostList, setJobpostList] = useState<JobPostingObject[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${endpoint.path}jobpost/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "accesstoken": accessToken,
          },
        });

        const jsonData = await response.json();
                
        if (!response.ok) {
          throw new Error(jsonData);
        }

        setJobpostList(jsonData.jobpostings);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    getData();
  }, []);

  const serchOnClick = (newData: JobPostingObject[]) => {
    setJobpostList(newData);
  };

  return (
    <>
      <FilterHeader siteType='jobpost' serchOnClickJobtype={serchOnClick} />
      <div className="container-sm content">
        <h1 className="heading-1 title">Jobopslag</h1>
        <div className=" content__blocks">
          {Object.keys(jobpostList).length > 0 ? (
            jobpostList.map((job, index) => (
              <JobPostingCard
                key={index}
                id={job.id}
                companyName={job.companyName}
                title={job.title}
                deadline={job.deadline}
                address={job.address}
                description={job.description}
                jobtype={job.jobtype}
              ></JobPostingCard>
            ))
          ) : (
            <NotFoundCard>Ingen jobopslag matcher dine filtre</NotFoundCard>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JobPosting;

import JobPostingCard from "../components/ElementBlocks/content/jobPostingCard";
import endpoint from "../config.json";

import "../scss/pages/content.scss";
import { useEffect, useState } from "react";

import FilterHeader from "../components/layout/FilterHeader";
import Footer from "../components/layout/Footer";

interface JobPostingObject {
  id: number;
  companyName: string;
  title: string;
  deadline: string;
  address: string;
  description: string;
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
            accesstoken: accessToken,
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
    setJobpostList(newData)
  }

  return (
    <>
    <FilterHeader isCompany={false} serchOnClickJobtype={serchOnClick}/>
      <div className="container-sm content">
        <h1 className="heading-1 title">Jobopslag</h1>
        <div className=" content__blocks">
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
      <Footer/>
    </>
  );
}

export default JobPosting;

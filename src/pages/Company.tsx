import { useEffect, useState } from "react";

import endpoint from "../config.json";
import "../scss/pages/content.scss";

import FilterHeader from "../components/layout/FilterHeader";
import Footer from "../components/layout/Footer";

import CompanyCard from "../components/elementBlocks/content/CompanyCard";
import NotFoundCard from "../components/elementBlocks/content/NotFoundCard";

interface CompanyObject {
  id: number;
  companyName: string;
  description: string;
  jobpostingCount: number;
}

function Company() {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const [companyList, setCompanyList] = useState<CompanyObject[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${endpoint.path}company/all`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            accesstoken: accessToken,
          },
        });

        const jsonData = await response.json();

        if (!response.ok) {
          throw new Error(jsonData);
        }        

        setCompanyList(jsonData.companys);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    getData();
  }, []);

  const serchOnClick = (newData: CompanyObject[]) => {
    setCompanyList(newData);
  };

  return (
    <>
      <FilterHeader serchOnClickCompany={serchOnClick} siteType='company' />
      <div className="container-sm content">
        <h1 className="heading-1 title">Virksomheder</h1>
        <div className="content__blocks">
          {Object.keys(companyList).length > 0 ? (
            companyList.map((com, index) => (
              <CompanyCard
                key={index}
                id={com.id}
                companyName={com.companyName}
                description={com.description}
                jobpostingCount={com.jobpostingCount}
              ></CompanyCard>
            ))
          ) : (
            <NotFoundCard>Ingen virksomheder matcher dine filtre</NotFoundCard>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Company;

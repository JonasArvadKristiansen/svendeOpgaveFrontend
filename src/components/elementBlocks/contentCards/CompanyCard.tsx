import { Link } from "react-router-dom";

interface Props {
  id: number;
  companyName: string;
  description: string;
  jobpostingCount: number;
  jobtypes: string;
}

function CompanyCard(prop: Props) {
  return (
    <div className="content__blocks__card">
      <div className="content__blocks__card__header">
        <h6 className="heading-6">{prop.companyName}</h6>
        <h6 className="heading-6" >Jobopslag: {prop.jobpostingCount}</h6>
      </div>

      <div>
        <h6 className="heading-6">Jobtyper</h6>
        <div className="content__blocks__card__jobtypes">
          {prop.jobtypes.split(",").map((type, index) => (
            <div key={index} className="jobtype">
              <p>{type}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content__blocks__card__description">
        <p>
          {prop.description}...
          <Link to={`/companyInfo/${prop.id}`}>Se Mere</Link>
        </p>
      </div>
    </div>
  );
}

export default CompanyCard;

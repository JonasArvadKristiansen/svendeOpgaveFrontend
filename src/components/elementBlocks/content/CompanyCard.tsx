import { Link } from "react-router-dom";
import "../../../scss/pages/content.scss";

interface Props {
  id: number;
  companyName: string;
  description: string;
  jobpostingCount: number;
}

function CompanyCard(prop: Props) {
  return (
    <div className="content__blocks__card">
      <div className="content__blocks__card__header">
        <p>{prop.companyName}</p>
        <p>Jobopslag: {prop.jobpostingCount}</p>
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
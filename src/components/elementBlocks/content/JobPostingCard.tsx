import "../../../scss/pages/content.scss";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  companyName: string;
  title: string;
  deadline: string;
  address: string;
  description: string;
}

function JobPostingCard(prop: Props) {
  return (
    <div className="content__blocks__card">
      <div className="content__blocks__card__header">
        <p>{prop.companyName}</p>
        <p>Udløbnings dato: {prop.deadline.split("T")[0]}</p>
      </div>
      <div className="content__blocks__card__header">
        <p>{prop.title}</p>
        <p>Addresse: {prop.address}</p>
      </div>
      <div className="content__blocks__card__description">
        <p>
          {prop.description}
          <Link to={`/jobpostingInfo/${prop.id}`}> Se Mere</Link>
        </p>
      </div>
    </div>
  );
}

export default JobPostingCard;
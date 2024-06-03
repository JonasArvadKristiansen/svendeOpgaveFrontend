import { Link } from "react-router-dom";

interface Props {
  id: number;
  companyName: string;
  title: string;
  deadline: string;
  address: string;
  description: string;
  jobtype: string;
}

function JobPostingCard(prop: Props) {
  return (
    <div className="content__blocks__card">
      <div className="content__blocks__card__header">
        <h6 className="heading-6">{prop.companyName}</h6>
        <h6 className="heading-6">Udløbnings dato: {prop.deadline.split("T")[0]}</h6>
      </div>

      <div className="content__blocks__card__header">
        <h6 className="heading-6">{prop.title}</h6>
        <h6 className="heading-6">Addresse: {prop.address}</h6>
      </div>
      
      <div>
        <h6 className="heading-6">Jobtype</h6>
        <div className="content__blocks__card__jobtypes">
          <p className="jobtype">{prop.jobtype}</p>
        </div>
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
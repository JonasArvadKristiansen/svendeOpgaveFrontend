
import DeafultLayout from "../layout/DeafultLayout";
import JobPostingCard from "../components/ElementBlocks/content/jobPostingCard";

import "../scss/pages/content.scss";

function JobPosting() {
  return (
    <DeafultLayout>
      <div className="container-sm content">
        <h1 className="heading-1 title">Jobopslag</h1>

        <div className=" content__blocks">
          <JobPostingCard />
          <JobPostingCard />
          <JobPostingCard />
          <JobPostingCard />
        </div>
      </div>
    </DeafultLayout>
  );
}

export default JobPosting;

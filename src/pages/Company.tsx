import DeafultLayout from "../layout/DeafultLayout";
import CopmanyCard from "../components/ElementBlocks/content/copmanyCard";

import "../scss/pages/content.scss";

function company() {
  return (
    <DeafultLayout>
      <div className="container-sm content" >
        <h1 className="heading-1 title">Virksomheder</h1>

        <div className=" content__blocks">
          <CopmanyCard />
          <CopmanyCard />
          <CopmanyCard />
          <CopmanyCard />
        </div>
        
      </div>
    </DeafultLayout>
  );
}

export default company;

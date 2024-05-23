import DeafultLayout from "../layout/DeafultLayout";
import TextWithHead from "../components/uiElements/TextSections";
import "../scss/pages/contentInfo.scss";
import CopmanyCard from "../components/ElementBlocks/content/copmanyCard";
import { Button } from "../components/uiElements/Buttons";
import { useState } from "react";
import { Link } from "react-router-dom";

function JobpostingInfo() {
  const [isOwner, setIsOwner] = useState(true);

  return (
    <DeafultLayout>
      <div className="container-sm content">
        <h1 className="heading-1 title">Jobopslg title</h1>
        <h2 className="heading-2 title">job type: </h2>

        <div className="grid-layout-job">
          <div className="grid-layout-job__item-1">
            <TextWithHead
              header="Arbejds beskrivelse"
              text="bulls awd awd awd aw a da w awd awda d awd awd wad awd wad wad wad wad wd daw daw dawd a daw d wada wd awd awd wad aw dwa dawdawdaw dawd aw daw dawd awd awd awd awd wad awd awd awd awd hit"
            />
          </div>
          <div className="grid-layout-job__item-2">
            <TextWithHead
              header="Jobtag"
              text="bullshit awd awda waw wa waaw daw dawd awdaw dawdada da da da dada aw da da dad ad awd awdawdwadawdawdawd"
            />
          </div>

          <div className="grid-layout-job__item-3">
            <h2 className="heading-2 title">company</h2>
            <CopmanyCard></CopmanyCard>

            <div className="grid-layout-job__item-3__button">
              {isOwner &&  <Link to={'/editJobpost'}>Redigere</Link>}
            </div>
          </div>
        </div>
      </div>
    </DeafultLayout>
  );
}

export default JobpostingInfo;

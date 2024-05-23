import DeafultLayout from "../layout/DeafultLayout";
import TextWithHead from "../components/uiElements/TextSections";
import "../scss/pages/contentInfo.scss";

function CompanyInfo() {
  return (
    <DeafultLayout>
      <div className="container-sm content">
        <h1 className="heading-1 title">Company name</h1>

        <div className="grid-layout-com">
          <div className="grid-layout-com__1">
            <TextWithHead
              header="Om us"
              text="bulls awd awd awd aw a da wdaw daw dawd a daw d wada wd awd awd wad aw dwa dawdawdaw dawd aw daw dawd awd awd awd awd wad awd awd awd awd hit"
            />
          </div>

          <div className="grid-layout-com__2">
            <div className="grid-layout-com__2__item-1">
              <TextWithHead header="Addresse" text="dwd" />
            </div>
            <div className="grid-layout-com__2__item-2">
              <TextWithHead header="CVR nummer" text="bullshit" />
            </div>
            <div className="grid-layout-com__2__item-1">
              <TextWithHead header="Telefon nummer" text="dwd" />
            </div>

            <div className="grid-layout-com__2__item-2">
              <TextWithHead header="Medarbejder" text="bullshit" />
            </div>
            <div className="grid-layout-com__2__item-1">
              <TextWithHead header="Email" text="dwd" />
            </div>
          </div>

          <div className="grid-layout-com__3">
            <TextWithHead
              header="Jobtag"
              text="bullshit awd awda waw wa waaw daw dawd awdaw dawdada da da da dada aw da da dad ad awd awdawdwadawdawdawd"
            />
          </div>

        </div>
      </div>
    </DeafultLayout>
  );
}

export default CompanyInfo;

import "../../scss/footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-container container-sm ">
        <div className="footer-container__section-title">
          <h1 className="heading-1">JobConnect</h1>
          <p>Fin din nye karriere i dag</p>
        </div>

        <div className="footer-container__section-brows">
          <h6 className="heading-6">Browse</h6>
          <div className="footer-container__section-brows__info">
            <Link to={"#"}>Jobopslag</Link>
            <Link to={"#"}>virksomheder</Link>
          </div>
        </div>
 
        <div className="footer-container__section-contact">
          <h6 className="heading-6">Kontakt Info</h6>

          <div className="footer-container__section-contact__info-container">
            <div className="footer-container__section-contact__info-container__info">
              <img src="phone.svg" alt="" /> 
              <p>+45 11 22 33 44</p>
            </div>
            <div className="footer-container__section-contact__info-container__info">
              <img src="mail.svg" alt="" />
              <p>JobConnect@hotmail.dk</p>
            </div>
            <div className="footer-container__section-contact__info-container__info">
              <img src="location.svg" alt="" />
              <p>Viborg H.C. Andersens Vej 7</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { Link } from "react-router-dom";

import "../../scss/footer.scss";
import phoneIcon from '../../assets/phone.svg';
import mailIcon from '../../assets/mail.svg';
import locationIcod from '../../assets/location.svg';

function Footer() {
  return (
    <footer>
      <div className="footer-container container-sm ">
        <div className="footer-container__section-title">
          <h1 className="heading-1">JobConnect</h1>
          <p>Fin din nye karriere i dag</p>
        </div>

        <div className="footer-container__section-brows">
          <h5 className="heading-5">Browse</h5>
          <div className="footer-container__section-brows__info">
            <Link to="/">Virksomheder</Link>
            <Link to="/jobposting">Jobopslag</Link>
            <p>ddd</p>
          </div>
        </div>

        <div className="footer-container__section-contact">
          <h5 className="heading-5">Kontakt Info</h5>

          <div className="footer-container__section-contact__info-container">
            <div className="footer-container__section-contact__info-container__info">
              <img src={phoneIcon} alt="telefon ikon" />
              <p>+45 11 22 33 44</p>
            </div>
            <div className="footer-container__section-contact__info-container__info">
              <img src={mailIcon} alt="mail ikon" />
              <p>JobConnect@hotmail.dk</p>
            </div>
            <div className="footer-container__section-contact__info-container__info">
              <img src={locationIcod} alt="placering ikon" />
              <p>Viborg H.C. Andersens Vej 7</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from "react";
import "../../../scss/pages/content.scss"
import { Link } from "react-router-dom";

function copmanyCard() {
  return (
    <div className="content__blocks__card">
      <div className="content__blocks__card__header">
        <p>Companyname</p>
        <p>Jobopslag: </p>
      </div>
      <div className="content__blocks__card__description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sed
          temporibus cum animi rem, obcaecati voluptatibus eaque aliquam hic
          voluptates debitis voluptatem, ullam aut blanditiis odit illum
          aliquid? Saepe, dolor? Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Corporis, soluta. Eveniet, architecto ipsa. Totam
          amet voluptatibus magnam, ex reprehenderit neque nobis obcaecati
          similique itaque. Eos id assumenda perferendis cum? Aspernatur.
          <Link to="/companyInfo"> Se Mere</Link>
        </p>
      </div>
    </div>
  );
}

export default copmanyCard;

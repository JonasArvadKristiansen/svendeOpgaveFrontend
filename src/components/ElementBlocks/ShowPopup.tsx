import React from "react";

interface Props {
  children: React.ReactNode;
}

function ShowPopup(prop: Props) {
  return (
    <div className="blackout-back">
      <div className="blackout-back__popup">
        <div className="blackout-back__popup__content">
          {prop.children}
          </div>
      </div>
    </div>
  );
}

export default ShowPopup;

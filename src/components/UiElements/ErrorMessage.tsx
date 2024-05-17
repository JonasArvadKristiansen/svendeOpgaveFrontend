import React from "react";

interface Props {
  erroMessage: string;
  failed: boolean;
}

function ErrorMessage(prop: Props) {
  return (
    <>
      {prop.failed && (
        <div className="error-message">
          <p>{prop.erroMessage}</p>
        </div>
        )}
    </>
  );
}

export default ErrorMessage;

interface PropsButton {
  children: string;
  type: "submit" | "button";
  onClick?: () => void;

  delete?: boolean;

  arialHaspopup?: boolean;
  arialExpanded?: boolean;
}

interface PropsCloseButton {
  onClick?: () => void;

  arialLabel: string;
  src: string;
  alt: string;
}
//action-button
function Button(prop: PropsButton) {
  return (
    <>
      <button
        type={prop.type}
        aria-haspopup={prop.arialHaspopup}
        aria-expanded={prop.arialExpanded}
        className={prop.delete ? "delete-button" : "action-button"}
        onClick={prop.onClick}
      >
        {prop.children}
      </button>
    </>
  );
}

function CloseButton(prop: PropsCloseButton) {
  return (
    <>
      <button
        type="button"
        className="close-button"
        aria-label={prop.arialLabel}
        onClick={prop.onClick}
      >
        <img src={prop.src} alt={prop.alt} />
      </button>
    </>
  );
}

export { Button, CloseButton };

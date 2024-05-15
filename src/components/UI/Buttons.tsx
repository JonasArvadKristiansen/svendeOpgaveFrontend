interface propsButton {
  children: string;
  type: "submit" | "button";
  onClick?: () => void;

  arialHaspopup?: boolean;
  arialExpanded?: boolean;
}

interface propsCloseButton {
  onClick?: () => void;

  arialLabel: string;
  src: string;
  alt: string;
}

function Button(prop: propsButton) {
  return (
    <>
        <button
          type={prop.type}
          aria-haspopup={prop.arialHaspopup}
          aria-expanded={prop.arialExpanded}
          className="action-button"
          onClick={prop.onClick}
        >
          {prop.children}
        </button>
      
    </>
  );
}

function CloseButton(prop: propsCloseButton) {
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

export {Button, CloseButton};

interface props {
  children: string;
  type: "submit" | "button";
  onClick?: () => void;

  arialHaspopup?: boolean;
  arialExpanded?: boolean;
}

function Button(prop: props) {
  return (
    <button
      type={prop.type}
      aria-haspopup={prop.arialHaspopup}
      aria-expanded={prop.arialExpanded}
      className="action-button"
      onClick={prop.onClick}
    >
      {prop.children}
    </button>
  );
}

export default Button;

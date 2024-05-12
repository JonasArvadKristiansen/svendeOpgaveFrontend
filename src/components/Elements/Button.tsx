interface props {
  children: string;
  onClick?: () => void;

  arialHaspopup?: boolean;
  arialExpanded?: boolean;
}

function Button(prop: props) {
  return (
    <button
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

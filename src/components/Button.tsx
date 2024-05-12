interface props {
  children: string;
  onClick?: () => void;
}

function Button(prop: props) {
  return <button onClick={prop.onClick}>{prop.children}</button>;
}

export default Button;
interface props {
  children: string;
  type: string;
  name: string;
} 

function Input(prop: props) {
  return (
    <div>
      <label htmlFor={prop.name}>{prop.children}</label>
      <input id={prop.name} type={prop.type} name={prop.name} placeholder={prop.children} />
    </div>
  );
}

export default Input;

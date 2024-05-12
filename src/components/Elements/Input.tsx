interface props {
  id: string;
  children: string;
  type: string;
  name: string;
  placeholder: string;
} 

function Input(prop: props) {
  return (
    <div>
      <label htmlFor={prop.id}>{prop.children}</label>
      <input id={prop.id} type={prop.type} name={prop.name} placeholder={prop.placeholder} />
    </div>
  );
}

export default Input;

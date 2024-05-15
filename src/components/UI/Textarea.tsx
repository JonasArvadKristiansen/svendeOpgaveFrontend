interface props {
  children: string;
  name: string;

  placeholder?: string;
  required?: boolean;
} 

function Textarea(prop: props) {
  return (
    <div>
      <label htmlFor={prop.name}>{prop.children}</label>
      <textarea id={prop.name}  name={prop.name} placeholder={!prop.placeholder? prop.children: prop.placeholder} required={prop.required} />
    </div>
  );
}

export default Textarea;
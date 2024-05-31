interface Props {
  label: string;
  children?: string;
  name: string;

  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean;
}

function Textarea(prop: Props) {
  return (
    <div>
      <label htmlFor={prop.name}>{prop.label}</label>
      <textarea
        id={prop.name}
        name={prop.name}
        placeholder={prop.placeholder}
        required={prop.required}
        value={prop.children}
        onChange={prop.onChange}
      />
      
    </div>
  );
}

export default Textarea;
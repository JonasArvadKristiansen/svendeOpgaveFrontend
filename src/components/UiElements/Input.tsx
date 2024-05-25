interface Props {
  children: string;
  type: string;
  name: string;

  placeholder?: string;
  required?: boolean;

  onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;

  //tlf type
  pattern?: string;

  //number type
  min?: string;
  max?: string;
  step?: string;
}

function Input(prop: Props) {
  return (
    <div>
      <label htmlFor={prop.name}>{prop.children}</label>
      <input
        max={prop.max}
        min={prop.min}
        step={prop.step}
        pattern={prop.pattern}
        onChange={prop.onchange}
        value={prop.value}
        id={prop.name}
        type={prop.type}
        name={prop.name}
        placeholder={!prop.placeholder ? prop.children : prop.placeholder}
        required={prop.required}
      />
    </div>
  );
}

export default Input;

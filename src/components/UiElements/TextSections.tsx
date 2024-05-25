interface Props {
  header: string;
  text: string | number;
}

function TextSections(prop: Props) {
  return (
    <div className="text-section">
      <h3 className="heading-3">{prop.header}</h3>
      <p>{prop.text}</p>
    </div>
  );
}

export default TextSections;

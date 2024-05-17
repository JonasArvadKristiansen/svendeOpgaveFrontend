interface Props {
  src: string;
  alt: string;
}

function Icon(prop: Props) {
  return (
    <>
      <img src={`src/assets/${prop.src}`} alt={prop.alt} />
    </>
  )
}

export default Icon

interface Props {
  children: string;
}

function NotFoundCard(prop: Props) {
  return (
    <div className="content__blocks__card">
      <p className="title">{prop.children}</p>
    </div>
  );
}

export default NotFoundCard;

interface Props {
  succeedMessage: string;
  succeeded: boolean;
}

function SucceMessage(prop: Props) {
  return (
    <>
      {prop.succeeded && (
        <div className="succeed-message">
          <p>{prop.succeedMessage}</p>
        </div>
      )}
    </>
  );
}

export default SucceMessage;

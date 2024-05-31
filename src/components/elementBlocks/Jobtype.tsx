import deleteIcon from "../../assets/exitSmall.svg";

interface Props {
  children: string;
  deleteJobtype: () => void;
}

function Jobtype(prop: Props) {
  return (
    <div className="jobtype">
      <p>{prop.children}</p>
      <button
        onClick={prop.deleteJobtype}
        aria-label="Slet jobtype"
        type="button"
      >
        <img src={deleteIcon} alt="Slet jobtype ikon"/>
      </button>
    </div>
  );
}

export default Jobtype;

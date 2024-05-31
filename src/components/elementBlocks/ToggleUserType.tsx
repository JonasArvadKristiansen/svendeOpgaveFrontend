interface Props {
  isBoolean: boolean;
  toggleSelect:() => void;
}

function ToggleUserType(prop: Props) {
  return (
    <div className="toggle-selector">
      <div
        className={
          prop.isBoolean
            ? "toggle-selector__container toggle-selector__container--selected"
            : "toggle-selector__container"
        }
      >
        <label htmlFor="jobseeker">Jobsøger</label>
        <input
          id="jobseeker"
          type="checkbox"
          checked={prop.isBoolean}
          onChange={prop.toggleSelect}
        />
      </div>

      <div
        className={
          !prop.isBoolean
            ? "toggle-selector__container toggle-selector__container--selected"
            : "toggle-selector__container"
        }
      >
        <label htmlFor="company">Virksomhed</label>
        <input
          id="company"
          type="checkbox"
          checked={!prop.isBoolean}
          onChange={prop.toggleSelect}
        />
      </div>
    </div>
  );
}

export default ToggleUserType;

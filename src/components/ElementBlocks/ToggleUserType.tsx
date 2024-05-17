interface Props {
  isJobseeker: boolean;
  toggleUserSelect: () => void;
}

function ToggleUserType(prop: Props) {
  return (
    <div className="toggle-selector">
      <div
        className={
          prop.isJobseeker
            ? "toggle-selector__container toggle-selector__container--selected"
            : "toggle-selector__container"
        }
      >
        <label htmlFor="jobseeker">Jobsøger</label>
        <input
          id="jobseeker"
          type="checkbox"
          checked={prop.isJobseeker}
          onChange={prop.toggleUserSelect}
        />
      </div>

      <div
        className={
          !prop.isJobseeker
            ? "toggle-selector__container toggle-selector__container--selected"
            : "toggle-selector__container"
        }
      >
        <label htmlFor="company">Virksomhed</label>
        <input
          id="company"
          type="checkbox"
          checked={!prop.isJobseeker}
          onChange={prop.toggleUserSelect}
        />
      </div>
    </div>
  );
}

export default ToggleUserType;

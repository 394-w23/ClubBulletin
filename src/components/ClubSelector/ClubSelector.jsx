const ClubButton = ({ club, selection, setSelection }) => (
  <div>
    <input
      type="radio"
      id={club}
      className="btn-check"
      checked={club === selection}
      autoComplete="off"
      onChange={() => setSelection(club)}
    />
    <label className="btn btn-success mb-1 p-2" htmlFor={club}>
      {club}
    </label>
  </div>
);

const ClubSelector = ({ clubs, selection, setSelection }) => (
  <div className="btn-group">
    {Object.keys(clubs).map((club) => (
      <ClubButton
        key={club}
        club={club}
        selection={selection}
        setSelection={setSelection}
      />
    ))}
  </div>
);

export default ClubSelector;

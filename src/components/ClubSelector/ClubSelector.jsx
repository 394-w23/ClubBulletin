const ClubButton = ({ club, id, selection, setSelection }) => {
  console.log("club", club);
  console.log("id", id);
  return (
  <div>
    <input
      type="radio"
      id={club}
      className="btn-check"
      checked={club === selection}
      autoComplete="off"
      onChange={() => setSelection(id)}
    />
    <label className="btn btn-success mb-1 p-2" htmlFor={club.name}>
      {club.name}
    </label>
  </div>
);
}

const ClubSelector = ({ clubs, selection, setSelection }) => {
  console.log(clubs);
  console.log("selection", selection);
  return (
  <div className="btn-group">
    {clubs.map(([id, club]) => (
      <ClubButton
        id={id}
        key={id}
        club={club}
        selection={selection}
        setSelection={setSelection}
      />
    ))}
  </div>
);
    }

export default ClubSelector;

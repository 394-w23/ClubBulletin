const ClubButton = ({ club, id, selection, setSelection }) => {
  //console.log("club", club);
  //console.log("id", id);

  const clubLabel = club === "ALL" ? "All clubs" : club.name;

  return (
    <div>
      <input
        type="radio"
        className="btn-check"
        id={id}
        checked={id === selection}
        autoComplete="off"
        onChange={() => setSelection(id)}
      />
      <label htmlFor={id} className="btn btn-success mb-1 p-2">
        {clubLabel}
      </label>
    </div>
  );
};

const ClubSelector = ({ club }) => {
  //console.log(clubs);
  console.log("selection", selection);
  return (
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#">Active</a>
    </li>
    // <div className="btn-group">
    //   <ClubButton
    //     id={"ALL"}
    //     key={0}
    //     club={"ALL"}
    //     selection={selection}
    //     setSelection={setSelection}
    //   />
    //   {clubs.map(([id, club]) => (
    //     <ClubButton
    //       id={id}
    //       key={id}
    //       club={club}
    //       selection={selection}
    //       setSelection={setSelection}
    //     />
    //   ))}
    // </div>
  );
};

export default ClubSelector;

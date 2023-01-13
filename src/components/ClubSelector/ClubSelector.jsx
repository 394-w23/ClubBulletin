import Navigation from "../Navigation/Navigation";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ClubButton = ({ club, id, selection, setSelection }) => {

  const clubLabel = club === "ALL" ? "All clubs" : club.name;
  const isActive = id === selection.id ? "nav-link active" : "nav-link";
  return (
    <div>
      <li
        className="nav-item"
        id={id}
        autoComplete="off"
      >
        <a className={isActive} aria-current="page" key={id} onClick={() => setSelection({id})}>{clubLabel}</a>
      </li>

    </div>
  );
};


const ClubSelector = ({ currentClubs, selection, setSelection}) => {

  return (
    <ul className="nav nav-tabs">
      <ClubButton club="ALL" id="ALL" selection={selection} setSelection={setSelection}></ClubButton>
      {currentClubs.map(([id, club]) => (
        <ClubButton club={club} id={id} selection={selection} setSelection={setSelection}>
    
        </ClubButton>
      ))}
    </ul>



    // PREVIOUS
    // <li className="nav-item">
    //   <a className="nav-link active" aria-current="page" href="#">Something</a>
    // </li>
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

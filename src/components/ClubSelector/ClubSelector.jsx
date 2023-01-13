import Navigation from "../Navigation/Navigation";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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


const ClubSelector = ({ currentClubs }) => {
  // console.log(club);
  // console.log("selection", selection);
  return (
    <Tabs
      defaultActiveKey="all"
      id="filterClubs"
      className="mb-3"
    >
      <Tab eventKey="all" title="All Clubs">
      </Tab>
      {currentClubs.map(([id, club]) => (
        <Tab eventKey={club.name} title={club.name}>
        </Tab>
      ))
      
      }
    </Tabs>
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

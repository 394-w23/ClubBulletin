import Navigation from "../Navigation/Navigation";
import Tab from 'react-bootstrap/Tab';

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

const ClubTabs = ({ currentClubs }) => {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        <Sonnet />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <Sonnet />
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        <Sonnet />
      </Tab>
    </Tabs>
    // <Tabs >
    //   {currentClubs.map(([id, club]) => (
    //     <li className="nav-item">
    //       <a className="nav-link active" aria-current="page" href="#">Something</a>
    //     </li>)
    //   )}
    // </ul>
  );
};

const ClubSelector = ({ club }) => {
  // console.log(club);
  // console.log("selection", selection);
  return (
    <li className="nav-item">
      <a className="nav-link active" aria-current="page" href="#">Something</a>
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

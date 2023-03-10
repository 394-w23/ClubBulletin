import { useEffect } from "react";
import { useFormData } from "../../utilities/utilities";
import "./searchBar.css";
const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <input
      data-cy="search-bar-input-field"
      placeholder="Search"
      className="form-control"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
      data-testid="search-bar"
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const SearchBar = ({ query, setQuery }) => {
  const [state, change] = useFormData(() => {}, query);

  //console.log("state: ", state);

  useEffect(() => {
    setQuery(state);
  }, [state]);

  return (
    <div>
      <form noValidate>
        <InputField
          name="Search"
          // text="Search"
          state={state}
          change={change}
        />
      </form>
    </div>
  );
};
export default SearchBar;

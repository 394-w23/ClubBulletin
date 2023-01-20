import { useFormData } from "../../utilities/utilities";

const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const SearchBar = ({ query, setQuery }) => {
  const [state, change] = useFormData(() => {}, query);

  console.log("state: ", state);

  return (
    <div>
      <form noValidate>
        <InputField
          name="Search"
          text="Search"
          state={state}
          change={() => setQuery(state)}
        />
      </form>
    </div>
  );
};
export default SearchBar;

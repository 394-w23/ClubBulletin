import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = (props) => {
    return (
        <div>
            <form class="d-flex">
                <input class="form-control me-1" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-primary" type="submit">
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </button>
            </form>
        </div>
    );
}
export default SearchBar;
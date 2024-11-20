import "./search.css";
import SearchInput from "./SearchInput";

const Search = ({isActive}) => {

    return ( 
        <div className="search-container">
            <div className={`search-content ${isActive ? 'active' : ''}`}>
                <div className="search-title">
                    <h2>Search</h2>
                </div>
                <SearchInput handleUser={() => {}} />
            </div>
        
        </div>
     );
}
 
export default Search;
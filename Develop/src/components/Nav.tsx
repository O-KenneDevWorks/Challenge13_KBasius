import {Link} from 'react-router-dom';
import CandidateSearch from '../pages/CandidateSearch';
import SavedCandidates from '../pages/SavedCandidates';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/candidates">CandidateSearch</Link>
        </li>
        <li>
          <Link to="/saved-candidates">SavedCandidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

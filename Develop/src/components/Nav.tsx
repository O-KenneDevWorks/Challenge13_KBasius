import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link className='nav-link' to="/">Home</Link>
        </li>
        <li>
          <Link to="/SavedCandidates">SavedCandidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

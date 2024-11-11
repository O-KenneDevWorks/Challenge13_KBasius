import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface User {
  avatar_url: string;
  name: string;
  location: string;
  email: string;
  company: string;
  bio: string;
}

const CandidateSearch = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  const handleSearch = async () => {
    const results = await searchGithub(searchTerm);
    setUsers(results);
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <input
        type="text"
        placeholder="Search for candidates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        <h2>Search Results:</h2>
        {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <img src={user.avatar_url} alt={user.login} width="50" />
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  {user.login}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default CandidateSearch;

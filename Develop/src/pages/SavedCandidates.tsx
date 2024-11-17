import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";



const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const loadSavedCandidates = () => {
      const saved = localStorage.getItem('SavedCandidates');
      if (saved) {
        setSavedCandidates(JSON.parse(saved));
      }
    };

    loadSavedCandidates();
  }, []);

  const removeCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('SavedCandidates', JSON.stringify(updatedCandidates));
  };
  
  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Name</th>
              <th>Location</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.login} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{candidate.login}</td>
                <td>{candidate.name}</td>
                <td>{candidate.location}</td>
                <td>{candidate.company}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
                </td>
                <td>
                  <button onClick={() => removeCandidate(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have been saved.</p>
      )}
    </>
  );
};

export default SavedCandidates;
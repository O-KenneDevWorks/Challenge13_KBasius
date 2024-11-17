import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";



const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const loadSavedCandidates = () => {
      const saved = localStorage.getItem('savedCCandidates');
      if (saved) {
        setSavedCandidates(JSON.parse(saved));
      }
    };

    loadSavedCandidates();
  }, []);
  
  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>
              <img src={candidate.avatar_url} alt={candidate.login} style={{width: '50px', height: '50px' }} />
              <p>{candidate.login}</p>
              <p>Name: {candidate.name}</p>
              <p>Location: {candidate.location}</p>
              <p>Company: {candidate.company}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
            </li>
          ))}
        </ul>
      ) : (
        <p> No candidates have been saved.</p>
      )}  
    </>
  );
};

export default SavedCandidates;
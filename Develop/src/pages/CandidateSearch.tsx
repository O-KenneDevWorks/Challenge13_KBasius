import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<{ [key: string]: Candidate }>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('SavedCandidates');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await searchGithub();
        console.log('Fetched data:', data);
        setCandidates(data);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, []);

  const saveCandidate = () => {
    const candidateKeys = Object.keys(candidates);
    if (candidateKeys[currentIndex]) {
      const candidateToSave = candidates[candidateKeys[currentIndex]];
      const updatedSavedCandidates = [...savedCandidates, candidateToSave];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('SavedCandidates', JSON.stringify(updatedSavedCandidates));
      nextCandidate();
    }
  };

  const nextCandidate = () => {
    const candidateKeys = Object.keys(candidates);
    if (currentIndex < candidateKeys.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setError('No more candidates available');
    }
  };

  const previousCandidate = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const candidateKeys = Object.keys(candidates);
  const currentCandidate = candidates[candidateKeys[currentIndex]];

  if (!currentCandidate) {
    return <h1>No candidate found</h1>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
        <h2>{currentCandidate.login}</h2>
        <p>Name: {currentCandidate.name || 'N/A'}</p>
        <p>Location: {currentCandidate.location || 'Not specified'}</p>
        <p>Company: {currentCandidate.company || 'Not specified'}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">Profile</a>
      </div>
      <button onClick={saveCandidate} aria-label="Save current candidate">+</button>
      <button onClick={nextCandidate} aria-label="Next candidate">-</button>
      <button onClick={previousCandidate} aria-label="Previous candidate">Previous</button>
      <button onClick={nextCandidate} aria-label="Next candidate">Next</button>

      <h2>Saved Candidates</h2>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>{candidate.login}</li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been accepted</p>
      )}
    </div>
  );
};

export default CandidateSearch;

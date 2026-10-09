import { useState } from 'react';

export default function Greeting() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 100);
  };

  return (
    <div>
      <h1>Welcome</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button type="submit">Submit</button>
          {loading && <p>Loading...</p>}
          {error && <p role="alert">{error}</p>}
        </form>
      ) : (
        <p>Hello, {name}! Welcome to Mctaba Academy.</p>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';

const LinkedInSignIn: React.FC = () => {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clientId = '77hkxo5d84qnax'; // Replace with your LinkedIn client ID
  const redirectUri = 'https://agent.emmanueltech.store';
  const scope = 'profile w_member_social';

  const signInWithLinkedIn = () => {
    const authUrl =
      `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code&` +
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      'state=' + Math.random().toString(36).substring(7);

    window.location.href = authUrl;
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
      .then(() => alert('Code copied to clipboard!'))
      .catch(err => alert('Failed to copy code'));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');

    if (code) {
      setAuthCode(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      setError(`${error}: ${errorDescription}`);
    }
  }, []);

  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>LinkedIn OAuth</h1>
      {!authCode ? (
        <button onClick={signInWithLinkedIn} id="signin-button" className="signin-button">
          <svg className="linkedin-icon" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
          Sign in with LinkedIn
        </button>
      ) : (
        <div id="result-container">
          <div className="status success">Authentication successful!</div>
          <div className="code-box">
            <strong>Authorization Code:</strong>
            <div style={{ marginTop: 10, wordBreak: 'break-all' }}>{authCode}</div>
          </div>
          <button onClick={() => copyCode(authCode)} className="copy-button">
            Copy Code
          </button>
        </div>
      )}
      {error && (
        <div className="status error">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default LinkedInSignIn;

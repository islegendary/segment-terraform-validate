import {useState} from 'react';
import {parse} from 'hcl2-parser';

export default function CodeSnippet({initialCode}) {
  const [code, setCode] = useState(initialCode);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setMessage('Copied!');
  }

  function handleTry() {
    setEditing(true);
    setMessage('');
  }

  function handleUse() {
    try {
      parse(code); // will throw if invalid
      setMessage('Valid HCL!');
    } catch (err) {
      setMessage('Invalid HCL: ' + err.message);
    }
  }

  async function handleFix() {
    if (!process.env.NEXT_PUBLIC_OPENAI_KEY) {
      setMessage('Codex not configured.');
      return;
    }
    const res = await fetch('/api/fix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (data.fixed) setCode(data.fixed);
  }

  return (
    <div>
      {editing ? (
        <textarea value={code} onChange={e => setCode(e.target.value)} rows={10} cols={80} />
      ) : (
        <pre>{code}</pre>
      )}
      <div>
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleTry}>Try</button>
        <button onClick={handleUse}>Use</button>
        <button onClick={handleFix}>Fix</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

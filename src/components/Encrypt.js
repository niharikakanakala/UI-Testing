import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom';

function Encrypt() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const history = useHistory();

  const encryptMessage = (msg, offset) => {
    const result = msg
      .split('')
      .map((char) => {
        const charCode = char.charCodeAt(0);

        if (charCode >= 65 && charCode <= 90) {
          return String.fromCharCode(((charCode - 65 + offset) % 26) + 65);
        }
        if (charCode >= 97 && charCode <= 122) {
          return String.fromCharCode(((charCode - 97 + offset) % 26) + 97);
        }
        return char;
      })
      .join('');

    return result;
  };

  const handleEncrypt = () => {
    const offset = Number(key);
    const encrypted = encryptMessage(input, offset);
    setEncryptedText(encrypted);
  };

  const handleReset = () => {
    setInput('');
    setKey('');
    setEncryptedText('');
  };

  const handleGoBack = () => {
    history.push('/'); 
  };

  return (
    <Paper
      data-testid="encryption-container"
      style={{
        margin: '50px auto',
        padding: '20px',
        maxWidth: '750px',
        backgroundColor: 'lightcyan',
        borderRadius: '4px',
        height: '400px',
      }}
    >
      <h2>Text encryption form</h2>
      <TextField
        label="Text to encrypt"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Key"
        type="number"
        variant="outlined"
        fullWidth
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleEncrypt}
        style={{ marginRight: '10px' }}
      >
        Encrypt
      </Button>
      <Button variant="contained" color="primary" onClick={handleReset}>
        Reset
      </Button>
      <TextField
        label="Encrypted Text"
        variant="outlined"
        fullWidth
        value={encryptedText}
        InputProps={{
          readOnly: true,
        }}
        style={{ marginTop: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleGoBack} style={{ marginTop: '20px' }}>
        Go Back
      </Button>
    </Paper>
  );
}

export default Encrypt;

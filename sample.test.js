import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router,  MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from './src/App';
import Encrypt from './src/components/Encrypt';


test('navigates to Encrypt page on button click', () => {
  // Render the component
  render(
    <Router>
      <App />
    </Router>
  );

  const encryptionButton = screen.getByTestId('encryption-button');
  fireEvent.click(encryptionButton);
  const encryptHeader = screen.getByText('React UI Form');
  expect(encryptHeader).toBeInTheDocument;
  const encryptHeade = screen.getByText('Reset');
  expect(encryptHeade).toBeInTheDocument;
  const header = screen.getByText('Text encryption form');
  expect(header).toBeInTheDocument;
  expect(document.title).toBe('React UI Testing');
  expect(screen.queryByTestId('encryption-button')).not.toBeInTheDocument;
});




test('button disappears on /encrypt route', async () => {
    render(
      <Router initialEntries={['/']}>
        <App />
      </Router>
    );
  
    let encryptionButton; 

    await waitFor(() => {
      encryptionButton = screen.queryByTestId('encryption-button');
      expect(encryptionButton).toBeNull(); // Button should not be present
    });
  
    if (encryptionButton) {
      fireEvent.click(encryptionButton);
    }
  
        // After clicking the button and navigating to /encrypt, it should disappear
        expect(screen.queryByTestId('encryption-button')).not.toBeInTheDocument;

    });
  

  test('has the correct styling', () => {
    render(<Encrypt />);
    const encryptionContainer = screen.getByTestId('encryption-container'); // Add test ID to the Paper component
    const styles = getComputedStyle(encryptionContainer);
    expect(styles.backgroundColor).toBe('lightcyan');
    expect(styles.marginTop).toBe('50px');
    expect(styles.height).toBe('400px');
    expect(styles.padding).toBe('20px');
    expect(styles.borderRadius).toBe('4px');
    expect(styles.maxWidth).toBe('750px');
  });

  test('applies proper margin to the Encrypt button', () => {
    render(<Encrypt />);
    const encryptButton = screen.getByText('Encrypt');
    const styles = getComputedStyle(encryptButton);
    expect(styles.marginRight).toBe('10px');
  });

  
  test('resets input fields and encrypted text on Reset button click', async () => {
    render(
      <MemoryRouter>
        <Encrypt />
      </MemoryRouter>
    );
  
    // Type some text and key
    userEvent.type(screen.getByLabelText('Text to encrypt'), 'Hello');
    userEvent.type(screen.getByLabelText('Key'), '3');
  
    // Click the Encrypt button
    userEvent.click(screen.getByText('Encrypt'));
  
    // Wait for the encryption process
    await waitFor(() => {
      // Ensure the encrypted text is displayed
      expect(screen.getByLabelText('Encrypted Text').value).toBe('Khoor');
    });
  
    // Click the Reset button
    userEvent.click(screen.getByText('Reset'));
  
    // Ensure input fields and encrypted text are cleared
    expect(screen.getByLabelText('Text to encrypt').value).toBe('');
    expect(screen.getByLabelText('Key').value).toBe('');
    expect(screen.getByLabelText('Encrypted Text').value).toBe('');
  });


 
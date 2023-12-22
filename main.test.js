import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './src/App';

test('navigates back to the home page when "Go Back" button is clicked', async () => {
    // Render the component
    render(
      <Router>
        <App />
      </Router>
    );
  
    // Click the "Click this" button to navigate to the /encrypt page
    fireEvent.click(screen.getByText('Click this'));
  
    // Wait for the component to update after navigation
    await waitFor(() => {
      // Check if the /encrypt page is rendered
      expect(screen.getByText('Text encryption form')).toBeInTheDocument;
    });
  
    // Click the "Go Back" button
    fireEvent.click(screen.getByText('Go Back'));
  
    // Wait for the component to update after navigation
    await waitFor(() => {
      // Check if the home page is rendered
      expect(screen.getByText('React UI Form')).toBeInTheDocument;
    });
  
    // Check if the current pathname is /
    expect(window.location.pathname).toBe('/');
  });

  test('applies proper styles to the "Click this" button', () => {
    render(
      <Router>
        <App />
      </Router>
    );
  
    // Find the button by its test ID
    const clickButton = screen.getByTestId('encryption-button');
  
    // Get computed styles
    const styles = window.getComputedStyle(clickButton);
  
    // Assert styling properties
    expect(styles.marginTop).toBe('20px');
    expect(styles.padding).toBe('10px 20px');
    expect(styles.backgroundColor).toBe('blue');
    expect(styles.color).toBe('white');
    expect(styles.borderRadius).toBe('5px');
  });
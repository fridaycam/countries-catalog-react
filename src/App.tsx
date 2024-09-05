import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Alert, Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <h2>Welcome to Countries Catalog Table</h2>
      <Button variant='contained' onClick={() => alert('You clicked me. Hello.')}>Test Button</Button>
    </div>
  );
}

export default App;

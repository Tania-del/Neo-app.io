import React, { useEffect } from 'react';
import { fetchNeoData } from './api';
import './App.css';
import { NeoProvider } from './components/NeoContext';
import { NeoList } from './components/NeoList';



export const App = () => {

  return (
    <NeoProvider> 
    <div className="App">
      <NeoList /> 
    </div>
     </NeoProvider>
  )
}

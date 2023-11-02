
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route , } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route>
      <Route index element={<index/>} /> {/* Main Page */}
        
        
      </Route>
    </Routes>
    
        

    
  </BrowserRouter>
  

    
  );
  
}

export default App;

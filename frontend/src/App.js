import React from 'react';
import { BrowserRouter, Routes, Route , } from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/login';



export default function App() {
  
  return (
    <BrowserRouter>
    
      <Routes>
        <Route>
          <Route index element={<Home />} /> {/* Main Page */}
          <Route path='Login' element={<Login/>}/>{/*Login Page */}

        </Route>
      </Routes>
      
          

      
    </BrowserRouter>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route , } from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/login';
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import Register from './pages/Register';
import EditUser from './pages/EditUser';
import Routine from './pages/Routine';


export default function App() {
  
  return (
    <BrowserRouter>
    
      <Routes>
        <Route>
          <Route index element={<Login />} /> {/* Main Page */}
          <Route path='Home' element={<Home/>}/>{/*Home Page */}
          <Route path='Register' element={<Register/>}/>{/*Register Page */}
          <Route path="UserList" element={<UserList />} />
          <Route path="UserList/add" element={<AddUser />} />
          <Route path="UserList/edit/:id" element={<EditUser />} />
          <Route path="Routine" element={<Routine />} />
        </Route>
      </Routes>
      
          

      
    </BrowserRouter>
  );
}

import React from 'react'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  return (
   
      <Navbar className='header' fixed="top">
        <Navbar.Brand href="/"><h1>Smart Home app  </h1></Navbar.Brand> {/*Home link in the logo */}
        <Navbar.Brand> </Navbar.Brand>
          <Navbar.Brand> </Navbar.Brand>
        
          
      </Navbar>
  );
}


Header.defaultProps = {
    title: 'Smart Home System '
}


export default Header;
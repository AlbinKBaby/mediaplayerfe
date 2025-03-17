import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'; 
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar className="bg-dark">
      <Container>
        <Navbar.Brand>
          <i className="fa-solid fa-video fa-beat text-warning me-2"></i>
          <Link to='/landingpage' style={{textDecoration:'none', color: 'white', fontWeight: '700' }}>MEDIA PLAYER</Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;

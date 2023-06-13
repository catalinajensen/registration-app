import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar
      sticky="top"
      className="bg-white mb-3"
      style={{ borderBottom: '1px solid black' }}
    >
      <Container>
        <Navbar.Brand>Event registration</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;

import { useState } from "react"
import Astronaut from "../components/NotFound/Astronaut"
import FourZeroFour from "../components/NotFound/FourZeroFour"
import MenuBar from "../components/NotFound/MenuBar"
import HamBurger from "../components/NotFound/Hamburger"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/components/NotFound/notfound.css"
import { Container, Row, Col } from 'react-bootstrap';
const NotFound = () => {
  const [nav, setNav] = useState()
  return (
    <section  className="notfound-body">
    <HamBurger nav={nav} />
    <MenuBar  nav={nav} setNav={setNav}/>
    <main>
    <Container className="notfound-container">
      <Row>
        <Col md={6} className="align-self-center">
          <Astronaut />
        </Col>
        <Col md={6} className="align-self-center">
          <FourZeroFour />
        </Col>
      </Row>
    </Container>
    </main>
  </section>
  )
}

export default NotFound
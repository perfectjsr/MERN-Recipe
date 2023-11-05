import React from 'react'
import Navbar from '../components/Navbar'
import { Container, Row, Col } from 'react-bootstrap';

const successMessageStyles = {
    backgroundColor: '#4CAF50',  // Green background color
    color: '#fff',  // White text color
    padding: '20px',  // Padding around the message
    borderRadius: '8px',  // Rounded corners
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',  // Box shadow for a card-like appearance
    textAlign: 'center',  // Center text
    fontSize: '24px',
  };

const Success = () => {
  return (
    <div>
    <Navbar/>
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col style={successMessageStyles}>
          <p className="text-center font-weight-bold text-lg">Payment is Successful</p>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Success
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const cancelMessageStyles = {
    backgroundColor: '#fff',  // White background color
    padding: '20px',  // Padding around the message
    borderRadius: '8px',  // Rounded corners
    textAlign: 'center',  // Center text
    fontSize: '24px',
  };

const Cancel = () => {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col style={cancelMessageStyles}>
          <p className="text-danger text-center font-weight-bold text-lg">Payment is Unsuccessful</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Cancel
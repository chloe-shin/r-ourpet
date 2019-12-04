
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Form} from 'react-bootstrap';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import Forms from './Form';


export default function Home() {

  return (
    <Container fluid={true}>

      <Row>
      <Col sm="4" md="4" lg= "6">
      <div className="booking ">
        <h4 className="welcome">WELCOME. <br />
          Are you ready to board?</h4> <br/>
       <Forms />
      </div>
    </Col>
        <Col sm="8" md="8" lg="6">
          <img className="dog" src="/img/bg.png" fluid/>
        </Col>
       
      </Row>
    </Container>
  )
}
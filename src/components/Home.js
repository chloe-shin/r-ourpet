
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container } from 'react-bootstrap';
import "react-awesome-button/dist/styles.css";
import ReactTypingEffect from 'react-typing-effect';
import Forms from './Form';

export default function Home(props) {

  return (
    <Container fluid={true} className="homepage">
      <Row>
        <Col sm={{ span: 5, offset: 0 }} md={{ span: 5, offset: 0 }} lg={{ span: 6, offset: 0 }}>
          <div className="booking ">
            <h5 className="welcome">
              WELCOME.
              <ReactTypingEffect
                text= "to board?  "
                staticText="Are you ready"
                speed="70"
                eraseDelay="700"
                cursor= <i class="fas fa-paw"></i>
                cursorClassName="plane"
              />
            </h5> <br />
            <Forms filter={props.filter} setFilter={props.setFilter} />
          </div>
        </Col>
        <Col sm={{ span: 7, offset: 0 }} md={{ span: 7, offset: 0 }} lg={{ span: 6, offset: 0 }} style={{ backgroundColor: "#FFD256" }}
          className="dogbg">

        </Col>
      </Row>
      <Row>

      </Row>
    </Container>
  )
}


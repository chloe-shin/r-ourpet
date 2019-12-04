import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Form} from 'react-bootstrap';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";


export default function Forms() {

return (
<Form>    
<Form.Row>
  <Form.Group as={Col} id="formGridCheckbox">
    <Form.Check type="checkbox" label="Dog" className="mr-3" />
  </Form.Group>
  <Form.Group as={Col} id="formGridCheckbox">
    <Form.Check type="checkbox" label="Cat" />
  </Form.Group>
</Form.Row>

<Form.Group controlId="formGridAddress1">
  <Form.Label>WHERE</Form.Label>
  <Form.Control placeholder="Zip code or address" />
</Form.Group>

<Form.Row>
  <Form.Group as={Col} controlId="checkin" className="in">
    <Form.Label>CHECK-IN</Form.Label>
    <Form.Control type="date" placeholder="Drop-off " />
  </Form.Group>
  <Form.Group as={Col} controlId="checkout" className="out">
    <Form.Label>CHECK-OUT</Form.Label>
    <Form.Control type="date"  placeholder="Pick-up" />
  </Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridState">
    <Form.Label>HOW MANY PETS? </Form.Label>
    <Form.Control as="select" type="number">
      <option>1 </option>
      <option>2 </option>
      <option>3 </option>
      <option>4 </option>
      <option>5 </option>
      <option>6 </option>
      <option>7 </option>
      <option>8 </option>
      <option>9 </option>
      <option>10 </option>
    </Form.Control>
  </Form.Group>
</Form.Row>
<Form.Row>
  <Form.Group as={Col} controlId="button">
  <AwesomeButton type="secondary" size="large" className="search">Search</AwesomeButton>
  </Form.Group>
</Form.Row>        
</Form>
)
}
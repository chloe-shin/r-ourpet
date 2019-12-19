import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Form, Card } from 'react-bootstrap';
import Forms from './Form';
import { Link, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

//how to bring sitter information I created at Home.js & Form.js (which i used props from Home.js)?

export default function SitterList(props) {
  const [value, setValue] = React.useState(4);
  const [sitters, setSitters] = useState([])
  const params = useParams()
  console.log(params['city'])
  useEffect(() => {
    fetchSitters()  // need to use filter later on
  }, [])

  // right now I get all sitters, but later i will use filter
  const fetchSitters = async () => {
    const res = await fetch(process.env.REACT_APP_BURL + "/sitter-list/" + params['city'])
    // body : stringify(filter)  /// not totally correct yet
    if (res.ok) {
      const data = await res.json()
      setSitters(data.sitters)
    }
  }

  return (
    <Container fluid={true}>
      <Row>
        <Col sm={{ offset: 0, span: 3 }} md={{ offset: 0, span: 3 }} lg={{ offset: 0, span: 3 }} style={{ marginTop: '5rem', marginLeft: '2rem' }}>
          <Forms filter={props.filter} setFilter={props.setFilter} />
        </Col>
        <Col sm="8" md="8" lg="8" style={{ marginTop: '5rem' }}>
          {sitters.map((s) => {
            return (
              <Row className="sitters_list" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.3)', padding: '15px 0px' }}>
                <Col sm="3" md="3" lg="3">
                  <img src={s.image} width="100%" className="mr " />
                </Col>
                <Col sm="9" md="9" lg="9">
                  <Link to={"/sitter-detail/" + s.sitter_id}>
                    <h6 style={{ color: 'orange' }}> {s.name} </h6>
                  </Link>
                
                  <p> {s.quote}</p>
                  <p>from <NumberFormat
                    value={s.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'₫'} />
                    &nbsp; per night
                </p>
                </Col>
              </Row>
            )
          })}
        </Col>

      </Row>
    </Container>
  )
}

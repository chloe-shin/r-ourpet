import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Form, Card, Button} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';


export default function SitterDetail(props) {
    const par = useParams()
    const [sitter, setSitter] = useState(null)

    useEffect(() => {
        fetchDetail(par['id'])  // need to use filter later on
    }, [])

    const fetchDetail = async (id) => {
        const res = await fetch(process.env.REACT_APP_BURL + "/sitter-detail/" + id)
        // body : stringify(filter)  /// not totally correct yet
        if (res.ok) {
            const data = await res.json()
            setSitter(data.sitter)
        }
    }

    return (
        <Container fluid={true}>
            <Row className="sitterdetailrow mt-5">
                <Col sm={4} md={4} lg={4}>
                    <img className="sitterimage" src={sitter && sitter.image} />
                </Col>

                <Col sm={8} md={8} lg={8} className="sitterdetailcol">
                    <h1> {sitter && sitter.name} </h1> <br/>
                    <p> <i class="fas fa-map-marker-alt"></i> &nbsp; {sitter && sitter.city} </p>
                    <p> <i class="fas fa-quote-left"></i> &nbsp;{sitter && sitter.quote} </p>
                   
                    <Link to= {'/sitter-detail/'+ (sitter && sitter.sitter_id) + '/contact'} >
                        <button className="contact"> <i class="fas fa-envelope"></i> &nbsp; Contact {sitter && sitter.name} </button>
                    </Link>
                    <br/>
                    <br/>
                    <div className="service" sm={4} md={4} lg={4}>
                    <h4> Pet Boarding Fee </h4>
                     Dog Boarding  <br/>
                    <NumberFormat value={sitter && sitter.price} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'₫'} /> / night
                    <br/>
                    <br/>
                    *Please contact to sitter to check availability.
                    </div> 
                </Col>
            </Row>
            <Row className="sitterdetailrow mt-5 pt-2">
                <Col sm={4} md={4} lg={4}>
                
                </Col> 
                <Col sm={8} md={8} lg={8}>
                    
                
                </Col>

            </Row>
        </Container>
    )
}
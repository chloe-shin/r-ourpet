import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import { Card, Col, Row, Container } from 'react-bootstrap';
import BookingStatusSitter from './BookingStatusSitter';
import moment from 'moment';

export default function BookingsForSitter() {
    const [bookings, setBookings] = useState(null)

    useEffect(() => {
        getBookings()
      }, [])

    const getBookings = async () => {
        const res = await fetch(process.env.REACT_APP_BURL + "/bookings-for-sitter", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          setBookings(data.bookings)
        }
      }  


      return (
        
        <Container fluid={true}  style={{ backgroundColor: 'rgba(200,200,200,.1)', 
                                          fontFamily: 'Open Sans',
                                          paddingBottom:'3rem'  }}>
        <Row>   
        <Col sm={1} md={1} lg={1}>
        </Col>
         <Col sm={10} md={10} lg={10}>
          <h4 style={{ marginLeft:"2rem", marginTop:"3rem"}}> 
              <i class="fas fa-briefcase"></i>&nbsp; 
              <strong> Manage boardings </strong> 
          </h4>
          </Col>
        </Row>
        <Row style={{ marginTop:"2rem"}}>
            <Col sm={1} md={1} lg={1}>
            </Col>
            <Col sm={10} md={10} lg={10}>
          
            {bookings && bookings.length === 0 ?     
              <Card style= {{margin:"3rem"}}>
                <Card.Body>
                  <Row>
                    <Col sm={4} md={4} lg={4}>
               </Col>
               <Col sm={6} md={6} lg={6}>
                
               There is no boardings yet.
                 
               </Col>
               <Col sm={2} md={2} lg={2}>
               </Col>
               </Row>
             </Card.Body>
            </Card> : <></>
            }


             {bookings && bookings.map((booking) => {
              return (
              <Card style= {{margin:"1rem"}}>
                <Card.Body>
                  <Row>
                    <Col sm={4} md={4} lg={4}>
                      <div class="Bookingsitter" style={{textAlign:"center" }}>
                      <img 
                      width="50" 
                      height="50"  
                      src='/img/user.png'
                      style={{borderRadius:"50%", margin:'10px'}} 
                      /> <br/>
                      <p> From {booking && booking.user_name} <br/>
                      {moment(booking && booking.created_at).fromNow()} </p>
                      </div>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                      <Link to ={`/bookings-for-sitter/${booking.id}/detail`}>
                      <p> <i class="fas fa-paw"></i> <strong>Boarding for {booking && booking.pet_name}</strong>  </p>
                      </Link>
                      <p> Drop-off : {moment(booking && booking.start).format("dddd, Do MMM YYYY")} </p>
                      <p> Pick-up : {moment(booking && booking.finish).format("dddd, Do MMM YYYY")} </p>
                    </Col>
                    <Col sm={2} md={2} lg={2}>
                    <BookingStatusSitter booking={booking} />
                    
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
            )
          })}



          </Col>

          <Col sm={1} md={1} lg={1}>
          </Col>
        </Row>
      </Container>
      )
    }
    
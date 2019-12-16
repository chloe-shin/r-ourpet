
import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Container, Badge, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookingStatus from './BookingStatus';
import moment from 'moment';
import NumberFormated from './NumberFormated'

export default function BookingsForUser() {
  const [bookings, setBookings] = useState(null)

  useEffect(() => {
    getBookings()
  }, [])

  const getBookings = async () => {
    const res = await fetch(process.env.REACT_APP_BURL + "/bookings", {
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

    <Container fluid={true}  style={{ backgroundColor: 'rgba(200,200,200,.1)', fontFamily: 'Open Sans' }}>
     <Row>
    <Col sm={1} md={1} lg={1}>
    </Col>
    <Col sm={10} md={10} lg={10} style={{backgroundColor:'white',  
                                         border:'1px solid rgba(0,0,0,0.1)', 
                                         borderRadius:'5px',
                                         padding: '25px',
                                         margin:'25px'
                                        }}>
      {bookings && bookings.map((booking) => {
        console.log({ booking })
        return (
           
              <Row >
                <Col sm={4} md={4} lg={4}>
                  <div class="Bookingsitter" style={{ margin: "2rem 0rem", display: "flex", alignItems: "flex-end" }}>
                    <img
                      width="80"
                      height="80"
                      src={booking && booking.sitter_pic}
                      style={{ borderRadius: "50%", margin: '10px' }}
                    /> <br />
                    <p> {booking && booking.sitter_name} <br />
                     You sent request {moment(booking && booking.created_at).fromNow()} </p>
                  </div>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <Link to={`/bookings/${booking.id}/detail`}>
                    <p> <i class="fas fa-paw"></i> &nbsp; <strong>Boarding for {booking && booking.pet_name}</strong>  </p>
                  </Link>
                  <p> Drop-off : {moment(booking && booking.start).format("dddd, Do MMM YYYY")} </p>
                  <p> Pick-up : {moment(booking && booking.finish).format("dddd, Do MMM YYYY")} </p>
                  <p> Price : <NumberFormated booking={booking}/> per night </p>
                </Col>
                <Col sm={2} md={2} lg={2} style={{margin:'2rem 0rem'}}>
                  <BookingStatus booking={booking} />
                </Col>
              </Row>
              
            )
          })}
          
          </Col>
          <Col sm={1} md={1} lg={1}>
          </Col>
          </Row>
    </Container>
        )
      }

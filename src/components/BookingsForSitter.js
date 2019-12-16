import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import { Card, Col, Row, Container } from 'react-bootstrap';
import BookingStatus from './BookingStatus';



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
        <div className="bookings" style={{display:"flex", 
                                          flexDirection:"column", 
                                          alignItems:"center",
                                          margin:"2rem 0rem",
                                          backgroundColor: "light grey"}}>
        
          {bookings && bookings.map((booking) => {
    
            return (
    
              <Card style= {{width: "80%"}}>
                <Card.Body>
                  <Row>
                    <Col sm={4} md={4} lg={4}>
                      <div class="Bookingsitter" style={{margin:"2rem 0rem", display:"flex", alignItems:"flex-end" }}>
                      <img 
                      width="80" 
                      height="80"  
                      src='/img/user.png'
                      style={{borderRadius:"50%", margin:'10px'}} 
                      /> <br/>
                      <p> From {booking && booking.user_name} <br/>
                          {booking && booking.created_at} </p>
                      </div>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                      <Link to ={`/bookings-for-sitter/${booking.id}/detail`}>
                      <p> <i class="fas fa-paw"></i> <strong>Boarding for {booking && booking.pet_name}</strong>  </p>
                      </Link>
                      <p> Drop-off : {booking && booking.start} </p>
                      <p> Pick-up : {booking && booking.finish} </p>
                    
                    </Col>
                    <Col sm={2} md={2} lg={2}>
                    <BookingStatus booking={booking} />
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
    
            )
          })}
    
        </div>
      )
    }
    
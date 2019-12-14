
import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import {Link } from 'react-router-dom';

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
    <div className="bookings" style={{display:"flex", 
                                      flexDirection:"column", 
                                      alignItems:"center",
                                      margin:"2rem 0rem",
                                      backgroundColor: "light grey"}}>

      {bookings && bookings.map((booking) => {
        console.log({booking})
        return (

          <Card style= {{width: "80%"}}>
            <Card.Body>
              <Row>
                <Col sm={4} md={4} lg={4}>
                  <div class="Bookingsitter" style={{margin:"2rem 0rem", display:"flex", alignItems:"flex-end" }}>
                  <img 
                  width="80" 
                  height="80"  
                  src={booking && booking.sitter_pic}
                  style={{borderRadius:"50%", margin:'10px'}} 
                  /> <br/>
                  <p> {booking && booking.sitter_name} <br/>
                      {booking && booking.created_at} </p>
                  </div>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <Link to ={`/bookings/${booking.id}/detail`}>
                  <p> <i class="fas fa-paw"></i> <strong>Boarding for {booking && booking.pet_name}</strong>  </p>
                  </Link>
                  <p> Drop-off : {booking && booking.start} </p>
                  <p> Pick-up : {booking && booking.finish} </p>
                  <p> Price : {booking && booking.price} per night </p>
                </Col>
                <Col sm={2} md={2} lg={2}>
                <button style={{border:'none', 
                                backgroundColor:'orange', 
                                color: 'white', 
                                boxShadow:'2px 3px 3px rgba(0,0,0,0.3)',
                                borderRadius:'5px',
                                padding: '5px 20px'}}
                > 
                Pay now 
                </button>
              </Col>
              </Row>
            </Card.Body>
          </Card>

        )
      })}

    </div>
  )
}

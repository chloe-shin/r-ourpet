import React, {useState, useEffect, Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { Link, useParams, useHistory} from 'react-router-dom';
import NumberFormated from './NumberFormated'

export default function Payment() {

  useEffect(() => {
    fetchBooking()  
  }, [])
  const history = useHistory()
  const [booking, setBooking] = useState({})
  const par = useParams()

  const fetchBooking = async () => {
    const res = await fetch(process.env.REACT_APP_BURL + "/bookings/" + par.id + "/detail")
    if (res.ok) {
        const data = await res.json()
        setBooking(data.booking)
    }
  }

  const onToken = async(props) => {
  const res = await fetch(process.env.REACT_APP_BURL + "/bookings/" + par.id + "/checkout", {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({id:props.id})
  })

  if (res.ok){
    const data = await res.json()
    if(data.success==true){
     
      history.push('/bookings/checkout/successful')
    }
  }
  // console.log('props', props)
}
    
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
  
  return (
   
   
    <StripeCheckout
    amount={(booking.total_price)*0.0043}
    billingAddress
    description= {'Boarding for ' + (booking.pet_name)}
    image="/img/bg.png"
    locale="auto"
    name="Ourpet"
    stripeKey="pk_test_XRpHxnwEXUNB50TsbfoO0Kq400iOIXSe10"
    token={onToken}
    zipCode
    label="Pay Now"
    panelLabel= "Pay"
    style={{width:'100%'}}
    /> 


    )

  }



  


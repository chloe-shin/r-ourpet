import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {CardElement, injectStripe} from 'react-stripe-elements';

export default function Payment() {

    const [info, setInfo] = useState({});
    
    const handlePayment = async () => {
        const res = await fetch('process.env.REACT_APP_BURL/bookings/checkout')
        if (res.ok){
            const data = await res.json()
            setInfo(data)
        }
    }

  const handleSubmit = async () => {
    
  }


    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={handleSubmit}>Purchase</button>
    </div>
    )
}


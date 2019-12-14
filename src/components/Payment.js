import React, {useState} from 'react'
import {useParams} from 'react-router-dom'

export default function Payment() {

    // useEffect(() => {
    //     fetchDetail(par['id']) 
    // }, [])

    const [info, setInfo] = useState({});
    const handlePayment = async () => {
        const res = await fetch('process.env.REACT_APP_BURL/bookings/checkout')
        if (res.ok){
            const data = await res.json()
            setInfo(data)
        }
    }

    return (
        <div>
        <h2>Buy for $5.00</h2>
        <form action="/charge" method="post">
          <script
            src="https://checkout.stripe.com/checkout.js"
            class="stripe-button"
            data-key={ info.key }
            data-description="A Flask Charge"
            data-amount="500"
            data-locale="auto">
          </script>
        </form>
      </div>
    )
}

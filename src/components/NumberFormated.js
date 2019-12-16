
import React from 'react'
import NumberFormat from 'react-number-format';


export default function NumberFormated (props) {
    return (
        <NumberFormat value={props.booking && props.booking.price} 
                      displayType={'text'} 
                      thousandSeparator={true} 
                      prefix={'₫'} />
    )
}




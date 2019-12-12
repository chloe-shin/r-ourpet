import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function BasicInfo(props) {

    const handleChange = e => {
        props.setInput({
            ...props.input,
            [e.target.name]: e.target.value
        })
    }
    

    return(
    <form onChange={e => handleChange(e)}>
    <p style={{marginTop: '50px'}}> First, let's start with basic information. </p>
        <TextField
        label="City"
        name="city"
        variant="outlined"
    />
    </form>
    )
}
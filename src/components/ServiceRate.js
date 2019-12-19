import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';

export default function ServiceRate(props) {
    const handleChange = e => {
        props.setInput({
            ...props.input,
            [e.target.name]: e.target.value
        })
    }
    return(
        
        <form onChange={e => handleChange(e)} >
        <br/>
        <br/>
        <p> How much do you want service rate to be per night? </p>
        <TextField
        label="Price in VND per night (only number)"
        name="price"
        variant="outlined"
        id="mui-theme-provider-outlined-input"
        style={{width: '20rem'}}
        type="number"
        />
        <br/>
        <br/>
        <br/>
    </form>
    )
}
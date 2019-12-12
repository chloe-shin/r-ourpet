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
        <TextField
        label="Price"
        name="price"
        variant="outlined"
        id="mui-theme-provider-outlined-input"
    />
    </form>
    )
}
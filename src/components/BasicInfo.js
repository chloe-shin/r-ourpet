import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Location from './Location';

export default function BasicInfo(props) {

    const handleChange = e => {
        props.setInput({
            ...props.input,
            [e.target.name]: e.target.value
        })
    }
    

    return(
    <form onChange={e => handleChange(e)}>
    <p style={{marginTop: '50px'}}> 
    First, let's start with basic information.
    Which city are you living in? 
    </p>
    <Location />
    <br/>
    <br/>
    </form>
    )
}
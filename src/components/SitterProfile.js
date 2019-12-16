import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';


export default function SitterProfile(props) {

   
    const handleChange = e => {
        props.setInput({
            ...props.input,
            [e.target.name]: e.target.value
        })
    }
   
    return (
    <form onChange={e => handleChange(e)} >
    <br/>
    <br/>
    <p> Please choose your profile photo (url) </p>
   
        <TextField
        label="profile photo"
        name="picture"
        variant="outlined"
        id="mui-theme-provider-outlined-input"
        // style={{ width: '80%' }}
        />
    <br/>
    <br/>
    <br/>
    <p> Please let people get to know about yourself! </p>
        <TextField
        label="Introduction"
        name="quote"
        variant="outlined"
        id="mui-theme-provider-outlined-input"
        className="introduction"
        style={{ width: '30rem' }}
        />
    <br/>
    <br/>
    </form>
    )
}
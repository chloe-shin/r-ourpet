import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, indigo } from '@material-ui/core/colors';
// import Container from '@material-ui/core/Container';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function ContactSitter(props) {
    const par = useParams()
    const [sitter, setSitter] = useState(null)
    const [booking, setBooking] = useState({
        is_photo: false
    })
    const history = useHistory();

    useEffect(() => {
        fetchDetail(par['id'])  // need to use filter later on
    }, [])

    const fetchDetail = async (id) => {
        const res = await fetch(process.env.REACT_APP_BURL + "/sitter-detail/" + id)
        if (res.ok) {
            const data = await res.json()
            setSitter(data.sitter)
        }
    }

    const handleChange = e => {
        console.log('changing', e.target.name)

        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        })
    }

    const   handlePhoto = e => {
        setBooking({
            ...booking,
            is_photo: !booking.is_photo
        })
    }

    const handleStartDate = date => {
        if (date !== "Invalid Date") {
            // setBooking({
            //     start: booking.startDate,
            //     finish: booking.finishDate,
            //     message: booking.message,
            // })
            setBooking({
                ...booking, //contain all objects.
                startDate: date
            })
        }

    };

    const handleFinishDate = date => {
        setBooking({
            ...booking,
            finishDate: date
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = { ...sitter, ...booking }
        console.log(body, process.env.REACT_APP_BURL);
        const res = await fetch((process.env.REACT_APP_BURL + "/sitter-detail/" + par['id'] + "/contact"), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            const data = await res.json()
            console.log('data', data)
            if (data.success == true) {
                alert('successfully sent!')
                history.push('/')
            }
        }
    }

    const theme = createMuiTheme({
        palette: {
            primary: orange,
            secondary: {
                light: indigo,
                main: '#ffffff',
            },
        },
        '&:hover inputset': {
            borderColor: 'orange',
        },
    });
    const useStyles = makeStyles(theme => ({

        paper: {
            marginTop: theme.spacing(6),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();
    const formIsValid = !booking.startDate || !booking.finishDate || !booking.message
    console.log('sitter', sitter, 'booking', booking)

    return (
        <Container component="main" maxWidth="xs">
            <Row>
                <Col sm={8} md={8} lg={8}>


                    <ThemeProvider theme={theme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <form className={classes.form} onChange={(e) => handleChange(e)}  >
                                <h3> <strong> Contact to {sitter && sitter.name} </strong> </h3>

                                <p>  Woo-hoo, welcome on board. <br />
                                    First, please send <strong> a booking request </strong> for sitter to confirm booking. </p>
                                <br />
                                <br />
                                <h5 style={{ color: '#FFD256' }}> <i class="fas fa-suitcase"></i> Booking information </h5>
                                <br />
                                <Row >
                                    <Col sm={6} md={6} lg={6}>

                                        <p>When would you like to drop off?</p>

                                        <KeyboardDatePicker
                                            autoOk
                                            name="startDate"
                                            variant="inline"
                                            inputVariant="outlined"
                                            format="MM/dd/yyyy"
                                            label="Select a date"
                                            value={booking.startDate}
                                            onChange={handleStartDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            InputAdornmentProps={{ position: "start" }}
                                        />
                                    </Col>
                                    <Col sm={6} md={6} lg={6}>
                                        <p>Around what time? </p>
                                        <KeyboardTimePicker
                                            autoOk
                                            name="startDate"
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Select time for pick up"
                                            value={booking.startDate}
                                            onChange={handleStartDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                            // InputProps={{
                                            //     position: "start",
                                            //     endAdornment: (
                                            //       <InputAdornment>
                                            //         <IconButton>
                                            //           <AccessTimeIcon />
                                            //         </IconButton>
                                            //       </InputAdornment>
                                            //     ),
                                            //   }}
                                            InputAdornmentProps={{ position: "start" }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col sm={6} md={6} lg={6}>
                                        <p>When would you like to pick up?</p>
                                        <KeyboardDatePicker
                                            autoOk
                                            name="finishDate"
                                            variant="inline"
                                            inputVariant="outlined"
                                            format="MM/dd/yyyy"
                                            label="Select a date"
                                            value={booking.finishDate}
                                            onChange={handleFinishDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            InputAdornmentProps={{ position: "start" }}
                                        />
                                    </Col>
                                    <Col sm={6} md={6} lg={6}>
                                        <p>Around what time? </p>
                                        <KeyboardTimePicker
                                            autoOk
                                            name="finishDate"
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Select time for pick up"
                                            value={booking.finishDate}
                                            onChange={handleFinishDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                            InputAdornmentProps={{ position: "start" }}
                                        />

                                    </Col>
                                </Row>
                                <br />
                                <br />

                                <h5 style={{ color: '#FFD256' }}><i class="fas fa-paw"></i> Pet Information </h5>
                                <br />
                                <Form.Label>FOR MY LOVELY &nbsp; </Form.Label> <br />
                                <Form.Check inline type="checkbox" name="pet_type" value="dog" label="Dog" className="mr-3" />
                                <Form.Check inline type="checkbox" name="pet_type" value="cat" label="Cat" />
                                <br />
                                <br />
                                <Form.Label>SIZE &nbsp; </Form.Label>  <br />
                                <Form.Check inline type="checkbox" name="pet_size" value="small" label="small" className="mr-3" />
                                <Form.Check inline type="checkbox" name="pet_size" value="medium" label="medium" className="mr-3" />
                                <Form.Check inline type="checkbox" name="pet_size" value="large" label="large" />
                                <br />
                                <br />
                                <Form.Label>SEX &nbsp; </Form.Label>  <br />
                                <Form.Check inline type="checkbox" name="pet_sex" value="female" label="Female" className="mr-3" />
                                <Form.Check inline type="checkbox" name="pet_sex" value="male" label="Male" />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Name"
                                    name="pet_name"
                                    // value={booking.pet_name}
                                    // onChange={handleChange}
                                    autoFocus
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Breed"
                                    name="pet_breed"
                                    // value={booking.pet_breed}
                                    // onChange={handleChange}
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Age (years)"
                                    name="pet_age"
                                    // value={booking.pet_age}
                                    // onChange={handleChange}
                                    autoFocus
                                />

                                <br />
                                <br />
                                </form>

                            <h5 style={{ color: '#FFD256' }}> <i class="fas fa-envelope"></i> Message </h5>
                            <br />
                            <p> Share a little info about your pet and why they'd have a great time with {sitter && sitter.name} </p>
                            <textarea
                                style={{ height: '15rem', width: '50rem' }}
                                name="message"
                                onChange={(e) => handleChange(e)}
                            >
                            </textarea>

                            <br />
                            <Form.Check inline type="checkbox" 
                                        name="is_photo" 
                                        value={booking.is_photo} 
                                        onClick={handlePhoto} 
                                        label="I'd like to receive photos of my pet(s) during this stay." 
                                        className="mr-3" />
                            <br />
                            <br />
                            <br />
                            <p style={{ border: '0.5px solid rgba(0,0,0,.3)', width: '50rem', padding: '1rem 1rem', borderRadius: '5px', borderLeft: 'solid 15px #00BD70' }}>
                                <strong>Estimated price for the booking will be: {sitter && sitter.price} vnd /night </strong> <br />
                                Booking is subject to availability and paying on Ourpet is required per Ourpet's Terms of Service.</p>
                            <br />
                            <br />
                            <button 
                                disabled={formIsValid}
                                style={{
                                    backgroundColor: '#FFD256',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 50px',
                                    color: 'white',
                                    marginBottom: '5rem',
                                }}
                                onClick={handleSubmit}
                            > Send
                            </button>

                        </MuiPickersUtilsProvider>
                    </ThemeProvider>
                </Col>

                <Col sm={4} md={4} lg={4}>
                    <img className="suitcase" src="/img/dog-suitcase.jpeg" />
                </Col>
            </Row>
        </Container >
    )

}


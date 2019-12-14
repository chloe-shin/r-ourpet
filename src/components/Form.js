import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import "react-awesome-button/dist/styles.css";
import { useHistory } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange, indigo } from '@material-ui/core/colors';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function Forms(props) {
  const history = useHistory()
  //I get all data from input 
  const handleChange = e => {
    props.setFilter({
      ...props.filter, // keep value of old fields that we already typed in
      [e.target.name]: e.target.value   // change value of the current typing field
    })
  }

  const handleSubmit = async (e) => {
    console.log("FORM FIRES")
    e.preventDefault()
    history.push('/sitter-list')
  }

  const theme = createMuiTheme({
    palette: {
      primary: orange,
      secondary: {
        light: indigo,
        main: '#ffffff',
      },
    },
  });
  //Handle check-in date
  const [selectedDated, setSelectedDated] = React.useState(new Date());
  const handleDateChanged = date => {
    setSelectedDated(date);
  };
  //Handle check-out date
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <Form className="bookingForm" onChange={e => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
      <Form.Row>
        <Form.Group as={Col} id="formGridCheckbox">
          <Form.Label>I'M LOOKING FOR MY LOVELY &nbsp; </Form.Label> <br />
          <Form.Check inline type="checkbox" label for="Dog" label="Dog" className="mr-3" />
          <Form.Check inline type="checkbox" label for="Cat" label="Cat" />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridAddress1">
        <Form.Label>BOARING NEAR</Form.Label>
        <Form.Control size="sm" placeholder="Zip code or address" />
      </Form.Group>

      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Form.Row>
            <Form.Group as={Col} controlId="checkin" className="in">
              <Form.Label>DROP-OFF</Form.Label>
              <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                label="Select a date"
                value={selectedDated}
                onChange={handleDateChanged}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="checkout" className="out">
              <Form.Label>PICK-UP</Form.Label>
              <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                label="Select a date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                
              />
            </Form.Group>
          </Form.Row>
        </MuiPickersUtilsProvider>
      </ThemeProvider>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>HOW BIG IS YOUR PET?</Form.Label> <br />
          <Form.Check inline label="Small" type="radio" id="inline-radio" />
          <Form.Check inline label="Medium" type="radio" id="inline-radio" />
          <Form.Check inline label="Large" type="radio" id="inline-radio" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>HOW MANY PETS? </Form.Label>
          <Form.Control size="sm" as="select" type="number">
            <option>1 </option>
            <option>2 </option>
            <option>3 </option>
            <option>4 </option>
            <option>5 </option>
            <option>6 </option>
            <option>7 </option>
            <option>8 </option>
            <option>9 </option>
            <option>10 </option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="button">
          <button className="search">Search</button>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}
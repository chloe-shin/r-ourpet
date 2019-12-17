import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory} from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import BookingStatusDetail from './BookingStatusDetail';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import NumberFormated from './NumberFormated';
import Payment from './Payment';


//Mui Library//
const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
//end of Mui Library//

export default function BookingDetail() {

const par = useParams()
const [booking, setBooking] = useState(null)
const history = useHistory();
  useEffect(() => {
    getBookingDetail()
  }, [])


const getBookingDetail = async () => {
    const res = await fetch(process.env.REACT_APP_BURL + "/bookings/" + par.id + "/detail")
    if (res.ok) {
      const data = await res.json()
      setBooking(data.booking)
    }   
  }

const handleDelete = async () => {
    const res = await fetch (process.env.REACT_APP_BURL + "/bookings/" + par.id + "/detail/delete", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem('token')}`
    }})   
    if (res.ok) {
        const data = await res.json()
        setBooking(data.booking)
        if (data.success == true){
            history.push('/bookings-for-user')
        }
    } 
  }

//Mui library
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
setOpen(true);
};
const handleClose = () => {
setOpen(false);
};
//end of Mui Library 

    return (
        <Container fluid={true}
        style={{backgroundColor: 'rgba(200,200,200,.1)', fontFamily:'Open Sans'}}>
        <Row>
        <Col sm={1} md={1} lg={1}></Col>
        <Col sm={7} md={7} lg={7} style={{margin: '4rem 0rem'}}>
        <div style={{ 
                     border:'1px solid rgba(0,0,0,0.1)', 
                     borderRadius:'5px',
                     padding: '25px',
                     backgroundColor:'white'}}>
            <h3><BookingStatusDetail booking={booking} /> </h3> 
            <hr/>
            <p> Drop-off : { moment (booking && booking.start).format("dddd, Do MMM YYYY")} </p>
            <p> Pick-up : { moment (booking && booking.finish).format("dddd, Do MMM YYYY")} </p>
            <hr/>
           
            <p> Message you sent:</p>
            <div class="speech-bubble">
            {booking && booking.message} 
            </div>
            <hr/>
            <h6>Sitter Information: </h6>
            <div style={{display:'flex', alignItems:'center'}}>
            <img src={booking && booking.sitter_pic} width="100" height="100" style={{borderRadius:"50%"}} />
            <Link to={'/sitter-detail/'+(booking && booking.sitter_id) }> 
            <p> &nbsp;&nbsp; <strong>{booking && booking.sitter_name}, {booking && booking.sitter_city}</strong> </p>
            </Link>
            </div>
            <hr/>
           
            <Button  variant="danger" onClick={handleClickOpen} >
             Delete booking
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Delete Booking
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Are you sure you want to delete booking?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="outline-secondary" autoFocus onClick={handleClose} >
                No I don't want to
              </Button>
              <Button variant="outline-danger" autoFocus onClick={(e)=> handleDelete(e)} >
                Yes I will delete booking
            </Button>
            </DialogActions>
          </Dialog>
          </div>
          </Col>
          <Col sm={3} md={3} lg={3} style={{margin: '4rem 0rem'}}>
          <div style={{
              border:'1px solid rgba(0,0,0,0.1)', 
              borderRadius:'5px',
              padding: '25px',
              backgroundColor:'white',
              marginBottom:'1rem'}}>

          *Check booking status carefully. <br/>
          <small>Do not pay directly to sitter when the booking is rejected, Ourpet doesn't take any responsibility for that. </small>
          

          </div>

          <div style={{
                       border:'1px solid rgba(0,0,0,0.1)', 
                       borderRadius:'5px',
                       padding: '25px',
                       backgroundColor:'white'}}>
          
          <h5> <strong>Payment Summary </strong></h5>
          <hr/>
          Pets: {booking && booking.pet_name} 
          <br />
          <br />
          Boarding Fee per night: &nbsp;
          <NumberFormated booking={booking}/>
          <br/>
          <br/>
          <NumberFormated booking={booking}/> x {booking && booking.days} nights
          <hr/>
          <strong>Subtotal: &nbsp;&nbsp;&nbsp;
          
          <NumberFormat value={booking && booking.total_price} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={'₫'} />
          </strong>
          <hr/>
          {booking && booking.is_confirmed ?
            <>
        
            <Payment /> 
           
            </> 
            :  <Button variant='primary' disabled={true} style={{width:'100%'}}>Pay after booking is confirmed</Button>
            }
         
          <br />
          
          </div>
          
          </Col>
          <Col sm={1} md={1} lg={1}></Col>
          </Row>
        </Container>
    )
}



  // <Link to={'/bookings/'+(booking && booking.id) +'/checkout'}> 
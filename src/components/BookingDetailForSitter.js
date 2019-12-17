import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';

import { Link, useParams, useHistory} from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

export default function BookingDetailForSitter() {

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
 
    const handleConfirm = async(e) => {
          // e.preventDefault()
          // setBooking ({
          //   is_confirmed: true})
          // const body = {...booking}

          const res = await fetch((process.env.REACT_APP_BURL + "/booking/" + par.id +"/confirm"), {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`
          }
          // body: JSON.stringify(body)
        });
        if (res.ok){
            // const data= await res.json()
            // if (data.success == true) {   
            alert('successfully confirmed')
            history.push('/bookings-for-sitter')
          }
        }
    
    console.log('handleConfirm', booking)

    const handleReject = async(e) => {
      const res = await fetch((process.env.REACT_APP_BURL + "/booking/" + par.id +"/reject"), {
       method: 'POST',
       headers: {
         "Content-Type": "application/json",
         Authorization: `Token ${localStorage.getItem('token')}`
       }
      });
      if (res.ok) {
        alert('You rejected booking')
        history.push('/bookings-for-sitter')
      }
    }
    
    // const handleReject = async () => {
    //     const res = await fetch (process.env.REACT_APP_BURL + "/bookings/" + par.id + "/reject", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Token ${localStorage.getItem('token')}`
    //     }})   
    //     if (res.ok) {
    //         const data = await res.json()
    //         setBooking(data.booking)
    //         if (data.success == true){
    //             history.push('/bookings-for-user')
    //         }
    //     } 
    //   }

    //Mui library
    const [open, setOpen] = React.useState(false);
    const [opened, setOpened] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };

    const handleClickOpened = () => {
      setOpened(true);
      };
      const handleClosed = () => {
      setOpened(false);
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
            <h3> <BookingStatusDetail booking={booking} /> </h3> 
            <hr/>
            <p> Drop-off : { moment (booking && booking.start).format("dddd, Do MMM YYYY")} </p>
            <p> Pick-up : { moment (booking && booking.finish).format("dddd, Do MMM YYYY")} </p>
            <hr/>
           
            <p> Message you got:</p>
            <div class="speech-bubble">
            {booking && booking.message} 
            </div>
            <hr/>
            <h6><i class="fas fa-paw"></i> Pet Information: </h6>
            <br/>
            <div>
            <p> &nbsp;&nbsp; Name: <strong>{booking && booking.pet_name}</strong> </p><br/>
            <p> &nbsp;&nbsp; Type:<strong>{booking && booking.pet_type}</strong> </p> <br/>
            <p> &nbsp;&nbsp; Size: <strong>{booking && booking.pet_size}</strong> </p><br/>
            <p> &nbsp;&nbsp; Breed:<strong>{booking && booking.pet_breed}</strong> </p><br/>
            <p> &nbsp;&nbsp; Age:<strong>{booking && booking.pet_age}</strong> </p><br/>
            <p> &nbsp;&nbsp; Sex: <strong>{booking && booking.pet_sex}</strong> </p>
            </div>
            <hr/>

                <p> Booking status:</p> 
                <BookingStatusDetail booking={booking} />

                <Button className="mr-2" variant="success" onClick={handleClickOpened}> Confirm booking 
                </Button>
                <Dialog onClose={handleClosed} aria-labelledby="customized-dialog-title" open={opened}>
                <DialogTitle id="customized-dialog-title" onClose={handleClosed}>
                Confirm Booking
              </DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Do you want to confirm this booking request?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button variant="outline-danger" autoFocus onClick={handleClosed} >
                    cancel
                  </Button>
                  <Button variant="outline-success" autoFocus onClick={(e)=> handleConfirm(e)} >
                    Yes I confirm
                </Button>
                </DialogActions>
              </Dialog>

                              
                <Button  variant="danger"  onClick={handleClickOpen}>
                 Reject booking
                </Button>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Reject Booking
                </DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Are you sure you want to reject this booking request?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button variant="outline-secondary"  autoFocus onClick={handleClose} >
                    No I don't want to
                  </Button>
                  <Button variant="outline-danger" autoFocus onClick={(e)=> handleReject(e)} >
                    Yes I will reject                 
                    </Button>
                </DialogActions>
              </Dialog>
            </div>
            </Col>
            <Col sm={1} md={1} lg={1}></Col>
            </Row>
        </Container>
            ) 
    }
    
    
    
import React, { useState, useEffect } from 'react';
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
            <div>
                <h1>Booking request from {booking && booking.user_name} </h1> 
                <p> Pick-up: {booking && booking.start} </p>
                <p> Drop-off: {booking && booking.finish} </p>
                <p> Message: <br/> {booking && booking.message} </p>
                <p> Pet information </p>
          
                <p> Booking status:</p> 
                <BookingStatusDetail booking={booking} />

                <button onClick={handleClickOpened}> Confirm booking 
                </button>
                <Dialog onClose={handleClosed} aria-labelledby="customized-dialog-title" open={opened}>
                <DialogTitle id="customized-dialog-title" onClose={handleClosed}>
                Confirm Booking
              </DialogTitle>pa
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Do you want to confirm this booking request?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <button autoFocus onClick={handleClosed} >
                    cancel
                  </button>
                  <button autoFocus onClick={(e)=> handleConfirm(e)} >
                    Yes I confirm
                </button>
                </DialogActions>
              </Dialog>

                              
                <button  onClick={handleClickOpen}>
                 Reject booking
                </button>
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
                  <button autoFocus onClick={handleClose} >
                    No I don't want to
                  </button>
                  <button autoFocus onClick={(e)=> handleReject(e)} >
                    Yes I will reject                 
                    </button>
                </DialogActions>
              </Dialog>
            </div>
        )
    }
    
    
    
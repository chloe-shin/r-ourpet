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
import BookingStatus from './BookingStatus';

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
        <div>
            <h1>Your booking request </h1> 
            <p> Pick-up: {booking && booking.start} </p>
            <p> Drop-off: {booking && booking.finish} </p>
            <p> Message: <br/> {booking && booking.message} </p>
            <h5> Pet information </h5>
            <div> Status: <BookingStatus booking={booking} /> </div>

            {booking && booking.is_confirmed ?
            <>
            <Link to={'/bookings/'+(booking && booking.id) +'/checkout'}> 
            <button> Pay now </button>
            </Link> <br/> 
            </> 
            : <></>
            }
            <button  onClick={handleClickOpen}>
             Cancel booking
            </button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Cancel Booking
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Are you sure you want to cancel booking?
              </Typography>
            </DialogContent>
            <DialogActions>
              <button autoFocus onClick={handleClose} >
                No I don't want to
              </button>
              <button autoFocus onClick={(e)=> handleDelete(e)} >
                Yes I will cancel booking
            </button>
            </DialogActions>
          </Dialog>
        </div>
    )
}



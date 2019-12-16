import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { Link,useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { green, red, pink, orange, indigo } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import CardTravelTwoToneIcon from '@material-ui/icons/CardTravelTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import FacebookIcon from '@material-ui/icons/Facebook';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: orange,
    },
});

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.primary,
            },
        },
    },
}))(MenuItem);



export default function NavBar(props) {

    //Mui library
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const history = useHistory()
    //Fetch backend url for logout
    const logout = async () => {
        const resp = await fetch(process.env.REACT_APP_BURL + "/logout", {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        });
        if (resp.ok) {
            props.setUser(null)
            localStorage.clear('token')
            history.push('/')
        }
    }
    return (
        <ThemeProvider>
            <Navbar id="navbar" bg="transparent" expand="lg" className="nav ">
                <Link to="/"> <Navbar.Brand className="ourpet" style={{ fontFamily: "Mali", fontSize: "25px", fontWeight: "900", color: "#FFD256" }}>
                    <i class="fas fa-paw"></i> Ourpet</Navbar.Brand> </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto ul">

                    {props.user && props.user.is_sitter ? 
                        <></> :
                        <Link to="/besitter">
                            <div className="sign mr-5"> <i class="fab fa-gratipay"></i> &nbsp;Become a sitter </div>
                        </Link> }

                        {props.user ?
                            <>
                                <div className="sign mr-5"
                                    onClick={handleClick}>
                                    <i class="fas fa-user-circle"></i> &nbsp;
                                {props.user && props.user.name} &nbsp; <i class="fas fa-angle-down"></i>
                                </div>

                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                {props.user && props.user.is_sitter 
                                    ? 
                                    <Link to="/bookings-for-sitter">
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <CardTravelTwoToneIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Boardings Management" />
                                    </StyledMenuItem>
                                    </Link>
                                    :
                                    <Link to="/bookings-for-user">
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <CardTravelTwoToneIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Boardings" />
                                    </StyledMenuItem>
                                    </Link>
                                }
                                {props.user && props.user.is_sitter 
                                    ? 
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <SettingsTwoToneIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Settings" />
                                    </StyledMenuItem>
                                    :
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <FavoriteIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Favorite Sitters" />
                                    </StyledMenuItem>
                                }
                                {props.user && props.user.is_sitter 
                                    ?
                                    <></>
                                    : 
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <SettingsTwoToneIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Setting" />
                                    </StyledMenuItem>
                                }

                                </StyledMenu>

                                <div onClick={() => logout()} className="sign"> <i class="fas fa-sign-out-alt"></i> &nbsp; Sign out</div>
                            </> :
                            <>
                                <Link to="/register">
                                    <div className="sign mr-5"
                                        onClick={handleClick}>
                                        Sign Up
                                </div>
                                </Link>
                                <Link to="/login"> <div className="sign"> Sign In </div> </Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </ThemeProvider>
    )
}

import React, { useState } from 'react';
import {
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { green, red, pink, indigo, orange } from '@material-ui/core/colors';
import { Link, useHistory } from "react-router-dom";
import { Col, Row, Form, Container } from 'react-bootstrap';

//Import Stepper from Material UI
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import BasicInfo from './BasicInfo'
import SitterProfile from './SitterProfile';
import ServiceRate from './ServiceRate';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    margin: {
        margin: theme.spacing(1),
    },
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
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
});



export default function SitterRegister() {
    const classes = useStyles();
    const history = useHistory();
    const [input, setInput] = useState(null)

    function getSteps() {
        return ['Basic Information', 'Sitter profile', 'Service rate'];
    }
    
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <BasicInfo input={input} setInput={setInput} />;
            case 1:
                return <SitterProfile input={input} setInput={setInput} />;
            case 2:
                return <ServiceRate  input={input} setInput={setInput} />;
            default:
                return 'Unknown stepIndex';
        }
    }
    const handleSubmit = async () => {
        // e.preventDefault()
        const res = await fetch(process.env.REACT_APP_BURL + "/sitter-register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(input)
        });
        if (res.ok) {
            const data = await res.json()
            if (data.success === true) {
                history.push('/sitter-register-successful')
            }
            else if (data.success === false) {
                alert('Account is exsisting')
            }
        }
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    // console.log(input);
    return (
        <Container fluid={true} 
        style={{backgroundImage: "url(/img/df-banner-dog.jpg)",
                backgroundSize: "cover" }}>
        <Row>
        <Col sm={6} md={6} lg={6} style={{textAlign:"center", margin:"5rem 0rem"}}>
        <h1 style={{color:'white'}}><strong>IT'S EASY.</strong> </h1>
        <br/>
         
        <h5 style={{textAlign:"center", marginBottom:'4rem', color:'white'}}> 
        Just let us know about yourself a little bit.
        </h5>

         <form id="becomesitter" className={classes.form} noValidate onSubmit={(e)=>{e.preventDefault();return}}>
            <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel >
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
             
                <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div className="registerButton" style={{textAlign: "center"}}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                              </Button>
                                    {activeStep === steps.length -1 
                                        ? 
                                        <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>
                                            Finish
                                        </Button>

                                        : 
                                        <Button variant="contained" color="primary" onClick={handleNext}>
                                        Next
                                    </Button>

                                    }
                            </div>
                        </div>
                    )}
                </div>
            </ThemeProvider>               
        </form>  
        

        <br/>
        <br/>
        <br/>
        <br/>

        </Col>

         <Col sm={6} md={6} lg={6} style={{textAlign:"center", margin:"5rem 0rem"}}>
           
            </Col>
            </Row>
        </Container>
    );
}


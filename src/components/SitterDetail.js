import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Form, Card, Button} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PetsIcon from '@material-ui/icons/Pets';


export default function SitterDetail(props) {
    const [value, setValue] = React.useState(4);
    const par = useParams()
    const [sitter, setSitter] = useState(null)

    useEffect(() => {
        fetchDetail(par['id'])  // need to use filter later on
    }, [])

    const fetchDetail = async (id) => {
        const res = await fetch(process.env.REACT_APP_BURL + "/sitter-detail/" + id)
        // body : stringify(filter)  /// not totally correct yet
        if (res.ok) {
            const data = await res.json()
            setSitter(data.sitter)
        }
    }

    return (
        <Container fluid={true}>
            <Row className="sitterdetailrow mt-5 mb-5">
                <Col sm={4} md={4} lg={4}>
                    <img className="sitterimage" src={sitter && sitter.image} />
                  
                </Col>

                <Col sm={7} md={7} lg={7} className="sitterdetailcol">
                    <h1> {sitter && sitter.name} </h1> <br/>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={value} readOnly />
                    </Box>
                    <p> <i class="fas fa-map-marker-alt"></i> &nbsp; {sitter && sitter.city} </p>
                    <p> <i class="fas fa-quote-left"></i> &nbsp;{sitter && sitter.quote} </p>
                    {props.user ? 
                    <Link to= {'/sitter-detail/'+ (sitter && sitter.sitter_id) + '/contact'} >
                        
                            <button className="contact"> <i class="fas fa-envelope">
                                </i> &nbsp; Contact {sitter && sitter.name} 
                            </button> 
                    </Link>    
                            :
                    <Link to= {'/login'} >
                            <button className="contact"> 
                            <i class="fas fa-sign-in-alt"></i> &nbsp; Login to contact {sitter && sitter.name} 
                            </button>
                    </Link>
                    }
                    <br/>
                    <br/>
                    <div className="service" >
                    <h4> Pet Boarding Fee </h4>
                     Dog Boarding  <br/>
                    <NumberFormat value={sitter && sitter.price} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'₫'} /> / night
                    <br/>
                    <br/>
                    *Please contact to sitter to check availability.
                    </div> 
                </Col>
                <Col sm={1} md={1} lg={1}>
                </Col>
            </Row>
          
        </Container>
    )
}


// Mui Star Rating
// <Box component="fieldset" mb={3} borderColor="transparent">
// <Typography component="legend">Custom empty icon</Typography>
// <Rating
//   name="customized-empty"
//   value={2}
//   precision={0.5}
//   emptyIcon={<StarBorderIcon fontSize="inherit" />}
// />
// </Box>
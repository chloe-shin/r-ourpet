import React, { useState, Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './Home'
import BeSitter from './BeSitter'
import SitterList from './SitterList'
import SitterRegister from './SitterRegister'
import SitterDetail from './SitterDetail';
import ContactSitter from './ContactSitter';
import BookingsForUser from './BookingsForUser';
import BookingsForSitter from './BookingsForSitter';
import BookingDetail from './BookingDetail';
import BookingDetailForSitter from './BookingDetailForSitter';
import Payment from './Payment';
import Location from './Location';
import SitterSuccess from './SitterSuccess';
import PaymentSuccess from './PaymentSuccess';

export default function Main(props) {
    const [filter, setFilter] = useState({})
    console.log(filter)
    return (
        <div>
            <Switch>
                <Route exact path="/" render={() => <Home filter={filter} setFilter={setFilter} />} />
                <Route path="/sitter-list/:city"
                       render={() => <SitterList
                       filter={filter}
                       setFilter={setFilter}
                    />
                    }
                />
                <Route path="/sitter-list"
                render={() => <SitterList
                filter={filter}
                setFilter={setFilter}
             />
             }
         />
                <Route path="/besitter" 
                render = {() => <BeSitter
                user={props.user}/>} />
              
                <Route exact path="/sitter-register" component={SitterRegister} />
                <Route exact path="/sitter-register-successful" component={SitterSuccess} />

                <Route exact path="/sitter-detail/:id"
                    render={() => <SitterDetail
                        user={props.user}
                    />
                    }
                />
                <Route exact path="/sitter-detail/:id/contact" component={ContactSitter} />
                <Route exact path="/bookings-for-user" component={BookingsForUser} />
                <Route exact path="/bookings-for-sitter" component={BookingsForSitter} />
                <Route exact path="/bookings-for-sitter/:id/detail" component={BookingDetailForSitter} />  
                <Route exact path="/bookings/:id/detail" component={BookingDetail} />  
                <Route exact path="/bookings/:id/checkout" component={Payment} />  
                <Route exact path="/bookings/checkout/successful" component={PaymentSuccess} />

                </Switch>
        </div>
    )
}

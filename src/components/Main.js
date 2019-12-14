import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './Home'
import BeSitter from './BeSitter'
import SitterList from './SitterList'
import SitterRegister from './SitterRegister'
import SitterDetail from './SitterDetail';
import ContactSitter from './ContactSitter';
import BookingsForUser from './BookingsForUser';
import BookingDetail from './BookingDetail';
import Payment from './Payment';

export default function Main(props) {
    const [filter, setFilter] = useState()
    return (
        <div>
            <Switch>
                <Route exact path="/" render={() => <Home filter={filter} setFilter={setFilter} />} />
                <Route exact path="/sitter-list"
                       render={() => <SitterList
                       filter={filter}
                       setFilter={setFilter}
                    />
                    }
                />
                <Route exact path="/besitter" component={BeSitter} />
                <Route exact path="/sitter-register" component={SitterRegister} />
                <Route exact path="/sitter-detail/:id"
                    render={() => <SitterDetail
                    />
                    }
                />
                <Route exact path="/sitter-detail/:id/contact" component={ContactSitter} />
                <Route exact path="/bookings" component={BookingsForUser} />
                <Route exact path="/bookings/:id/detail" component={BookingDetail} />  
                <Route exact path="/bookings/checkout" component={Payment} />  
            </Switch>
        </div>
    )
}

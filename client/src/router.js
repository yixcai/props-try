import React from 'react';
import { BrowserRouter, Switch, Route } from  'react-router-dom';
import MainHome from './pages/LoginPage';
import CustomerHomePage from './pages/homepage.js';
import CustomerMain from './pages/CustomerMain.js';
import CustomerHome from './pages/CustomerApp';
import CustomerRate from './pages/CustomerRate.js';
import CustomerProfile from './pages/CustomerProfile.js';
import VendorPark from './pages/VendorPark.js';
import VendorOrders from './pages/VendorOrders.js';
import VendorHome from './pages/VendorHome';

class Router extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={MainHome}></Route>
                    <Route path="/customer" exact component={CustomerHomePage}></Route>
                    <Route path="/menue" exact component={CustomerMain}></Route>
                    <Route path="/homepage" exact component={CustomerHome}></Route>
                    <Route path="/rate" exact component={CustomerRate}></Route>
                    <Route path="/profile" exact component={CustomerProfile}></Route>
                    <Route path="/vendor" exact component={VendorPark}></Route>
                    <Route path="/orders" exact component={VendorOrders}></Route>
                    <Route path="/vendorHome" exact component={VendorHome}></Route>

                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;

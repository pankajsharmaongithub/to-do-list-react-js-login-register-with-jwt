import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/RouteGuard"

//history
import { history } from './helpers/history';

//pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import ConfirmPage from "./pages/Confirm"

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <RouteGuard
                    exact
                    path="/portal"
                    component={HomePage}
                />
                <Route
                    path="/login"
                    component={LoginPage}
                />

                <Route
                    path="/register"
                    component={RegisterPage}
                />

                <Route
                    path="/confirmation"
                    component={ConfirmPage}
                />
                
                <Redirect to="/portal" />
            </Switch>
        </Router>
    );
}

export default Routes

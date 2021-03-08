import React, { useContext } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/layout/Navbar";
import SavedPage from "./components/pages/SavedPage";
import AuthContext from "./context/AuthContext";

export default function Router() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                {loggedIn === false && (
                    <>
                        <Route exact path="/">
                            <Signup />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </>
                )}
                {loggedIn === true && (
                    <>
                        <Route path="/home">
                            <HomePage />
                        </Route>
                        <Route path="/saved">
                            <SavedPage />
                        </Route>
                    </>
                )}
            </Switch>
        </BrowserRouter>
    )
}

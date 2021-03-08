import React, { useState, useContext, useEffect } from 'react';
import UserHeader from "../layout/UserHeader";
import axios from "axios";
import SavedContainer from "../layout/SavedContainer";
import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";

export default function SavedPage() {

    const { userId } = useContext(UserContext);
    const { loggedIn } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState("");

    async function getUserData() {
        if (loggedIn === true) {
            const userData = await axios.get(`user/profile/${userId}`);
            setUserEmail(userData.data.email)
        } else {
            setUserEmail("No user logged in")
        }
    }

    useEffect(() => {
        getUserData()
    });

    return (
        <div>
            <h2>Profile Page goes here.</h2>
            <br />
            <UserHeader email={userEmail} />
            <SavedContainer />
        </div>
    )
}

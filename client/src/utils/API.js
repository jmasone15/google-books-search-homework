import React from "react";
import axios from "axios";

const googleLink = "https://www.googleapis.com/books/v1/volumes?q="
const APIkey = `&key=AIzaSyAkTP-U7L6plBSpNK_ezI5i8ShDei0L75w`

export default {
    getBooksByTitle: (query) => {
        return axios.get(googleLink + query + APIkey);
    }
}
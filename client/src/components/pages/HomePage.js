import React, { useState } from 'react';
import Header from '../layout/Header';
import SearchForm from '../layout/SearchForm';
import ResultsContainer from '../layout/ResultsContainer';
import API from "../../utils/API";

export default function HomePage() {

    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);

    function searchBook(e, query) {
        e.preventDefault();
        API.getBooksByTitle(query).then(res => {
            console.log(res.data.items);
            setResults(res.data.items)
        })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Home Page goes here.</h2>
            <br />
            <Header />
            <SearchForm searchBook={searchBook} setShow={setShow} />
            {show ? <ResultsContainer results={results} /> : ""}

        </div>
    )
}

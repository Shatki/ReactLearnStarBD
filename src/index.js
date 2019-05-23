//import React from 'react';
//import ReactDOM from 'react-dom';
// https://swapi.co

const getResource = async (url) =>{
    const res = await fetch(url);
    return await res.json()
};


getResource('https://swapi.co/api/people/1/')
    .then((body)=>{
        console.log(body);
    });
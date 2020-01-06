import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Nav from '../nav/nav';
import { Link } from 'react-router-dom';
import './home.css';

class Home extends React.Component{
    render(){
        return(
            <div>
            <Header />
            <div className="navbar">
            <Nav /></div>
            <div className="home">Welcome to Noah Voice Assistant App</div>
            <Footer />
            </div>
        );
    }

}

export default Home;
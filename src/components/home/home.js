import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import './home.css';

class Home extends React.Component{
    render(){
        return(
            <div>
            <Header />
            <div className="homeTitle">
                <Link to='/home'>
            <button className="buttonProp">Home</button>
            </Link>
                
                <Link to='/admin'>
            <button className="buttonProp">Manage Question Set</button>
            </Link>

            <Link to='/settings'>
            <button className="buttonProp">Account Settings</button>
            </Link>
            
            <Link to='/logout'>
                <button className="buttonProp">LogOut</button>
            </Link>
            </div>
            <Footer />
            </div>
        );
    }

}

export default Home;
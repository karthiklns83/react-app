import React from 'react';
import './settings.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import Nav from '../nav/nav';

class Settings extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <div className="navbar">
                    <Nav />
                </div>
            <div className="settings">
                Coming soon...
            </div>
            <Footer />
            </div>
        );
    }

}

export default Settings;
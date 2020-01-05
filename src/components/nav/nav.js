import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

class Home extends React.Component{
    render(){
        return(
            <div>
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
            </div>
        );
    }

}

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

class Home extends React.Component{
    render(){
        return(
            <div>
                <div className="homeTitle">
                    <div className="buttoncontrol">
                <Link to='/home' className="link">
                    <div className="buttonProp">Home</div>
                    </Link>
                    </div>
                    <div className="buttoncontrol">
                <Link to='/admin' className="link">
                <div className="buttonProp">Admin</div>
            </Link>
            </div>
            <div className="buttoncontrol">
            <Link to='/settings' className="link">
            <div className="buttonProp">Settings</div>
            </Link>
            </div>
            <div className="buttoncontrol">
            <Link to='/logout' className="link">
            <div className="buttonProp">Logout</div>
            </Link></div>
            </div>
            </div>
        );
    }

}

export default Home;
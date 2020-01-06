import React from 'react';
import './header.css';

class Header extends React.Component{
    render(){
        return(
            <div className="header">
               <div className="name">Mr.Noah</div> 
                <div className="caption"> - The Messenger</div>
            </div>
        );
    }

}

export default Header;
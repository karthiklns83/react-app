import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

class Error extends React.Component{
    render(){
        return(
            <div>
                <Header />
            <div>One of the credentials is wrong. Use Signin button below to login again</div>
            <Footer />
            </div>
        );
    }

}

export default Error;
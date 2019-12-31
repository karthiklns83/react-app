import React from 'react';

class Home extends React.Component{
    render(){
        return(
            <div className="homeTitle">
                <div >Noah App Center</div>
            <a href='/admin'>Admin</a>
            <br />
            <a href='/timesheet'>View Timesheet</a>
            </div>
        );
    }

}

export default Home;
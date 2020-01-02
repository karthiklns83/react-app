import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component{
    render(){
        return(
            <div className="homeTitle">
                <div >Noah App Center</div>
                <Link to='/admin'>
            <button>Add Question Set</button>
            </Link>
            <br />
            <Link to='/timesheet'>
                <button>View Timesheet</button>
            </Link>
            </div>
        );
    }

}

export default Home;
import React from 'react';

class QuestionSet extends React.Component{
    
    render(){
        return(
            <div>
            <label htmlFor="questionset" >Question-set-1</label>
            <input
              name="questionset"
              type="text"
              placeholder="Enter your username"
            />

          </div>
        );
    }

}

export default QuestionSet;
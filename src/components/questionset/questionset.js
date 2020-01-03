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
            <button type="button">-</button>
            <label htmlFor="question" >Question</label>
            <input
              name="question"
              type="text"
              placeholder="Enter your Question"
            />
            <button type="button">-</button>
            <label htmlFor="answer" >Answer</label>
            <input
              name="answer"
              type="text"
              placeholder="Enter your Answer"
            />
            <button type="button">-</button>
          </div>
        );
    }

}

export default QuestionSet;
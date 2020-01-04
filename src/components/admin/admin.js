import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import QuestionSet from '../questionset/questionset'
import './admin.css'
import { render } from '@testing-library/react';

class Admin extends React.Component{
    constructor(props){
        super(props);
    this.state = { values: [{ value: 0 }], 
    answers: [{answer: 0}], 
    set: [{value: 0}],
    setCount: 0
};
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.buildJSON = this.buildJSON.bind(this);
    }

  createUI() {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <input
          type="text"
          value={el.value || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          type="button"
          value="remove"
          onClick={this.removeClick.bind(this, i)}
        />
      </div>
    ));
  }

  handleChange(i, event) {
    let values = [...this.state.values];
    values[i].value = event.target.value;
    this.setState({ values });
  }

  handleAnswerChange(i, event){
    let answers = [...this.state.answers];
    answers[i].answer = event.target.value;
    this.setState({ answers });

  }

  addSetClick(i){
    this.setState(prevState => ({
        setCount: i+1,
        values: [...prevState.values, { value: null }],
        answers: [...prevState.answers, { value: null }]
      }));
  }

  addClick() {
    this.setState(prevState => ({
      values: [...prevState.values, { value: null }]
    }));
  }

  addAnswerClick(){
    this.setState(prevState => ({
        answers: [...prevState.answers, { value: null }]
      }));
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }

  removeSetClick(index){
    let values = [...this.state.values];
    let answers = [...this.state.answers];
    values.splice(index, 1);
    answers.splice(index, 1);
    this.setState({ values, answers });
  }

  removeAnswerClick(i){
    let answers = [...this.state.answers];
    answers.splice(i, 1);
    this.setState({ answers });

  }

  buildJSON(){
      for(let arrVal=0; arrVal < (this.state.values).length; arrVal++){
          var questions = JSON.parse(this.state.values[arrVal].value);
          var answerset = JSON.parse(this.state.answers[arrVal].answer);
          //var questionset = this.state.setCount + arrVal;
          //return {questions, answerset, questionset};
          console.log("questions " +questions);
          console.log("answers" + answerset);
      }      
  }

  handleSubmit = (event) => {
    this.state.setCount = this.state.setCount+1;
      //alert(JSON.stringify(this.state));
      let requestPayload = this.buildJSON();
      //console.log(requestPayload);
    event.preventDefault();
  }

  render() {
      //console.log("inside render" + JSON.stringify(this.state));
    return (
      <form onSubmit={this.handleSubmit}>
          
        {this.state.values.map((el, i) => (
            <div>            
          <div key={i}>
            <input
              type="text"
              placeholder = "question"
              value={el.value || ""}
              onChange={e => this.handleChange(i, e)}
            />
            <input type="button" value="Add Question" onClick={() => this.addClick()} />
            <input
              type="button"
              value="Remove Question"
              onClick={() => this.removeClick(i)}
            />
          </div></div>
        ))}
        {this.state.answers.map((el, i) => (
            <div>
          <div key={i}>
            <input
              type="text"
              placeholder = "answer"
              value={el.answer || ""}
              onChange={e => this.handleAnswerChange(i, e)}
            />
            <input type="button" value="Add Answer" onClick={() => this.addAnswerClick()} />
            <input
              type="button"
              value="Remove Answer"
              onClick={() => this.removeAnswerClick(i)}
            />
          </div>
          </div>
        ))}
  <label >Question-set-{this.state.setCount+1}</label>
        {this.state.set.map((val, index) => (
            <div>
        <input type="button" value="Add set" onClick={() => this.addSetClick(this.state.setCount)} />
        <input type="button" value="Remove set" onClick={() => this.removeSetClick(index)} /></div>
        ))}
        
        <input type="submit" value="Submit" />
        
      </form>
    );
  }
}

export default Admin;
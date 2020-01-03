import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import QuestionSet from '../questionset/questionset'
import './admin.css'
import { render } from '@testing-library/react';

class Admin extends React.Component{

    state = { values: [{ value: null }], 
    answers: [{value: null}], 
    set: [{value: null}],
    setCount: 0
};

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

  addSetClick(){
    this.setState(prevState => ({
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

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.values.join(", "));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          
        {this.state.values.map((el, i) => (
            <div>
            <label >Question-set-{i+1}</label>
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
          <div key={i}>
            <input
              type="text"
              placeholder = "answer"
              value={el.value || ""}
              onChange={e => this.handleChange(i, e)}
            />
            <input type="button" value="Add Answer" onClick={() => this.addAnswerClick()} />
            <input
              type="button"
              value="Remove Answer"
              onClick={() => this.removeAnswerClick(i)}
            />
          </div>
        ))}
        {this.state.set.map((val, index) => (
            <div>
        <input type="button" value="Add set" onClick={() => this.addSetClick()} />
        <input type="button" value="Remove set" onClick={() => this.removeSetClick(index)} /></div>
        ))}
        
        <input type="submit" value="Submit" />
        
      </form>
    );
  }
}

export default Admin;
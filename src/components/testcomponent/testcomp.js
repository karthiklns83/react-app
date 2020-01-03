import React from 'react';

class TestComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionset: [],
            question: [],
            answer: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addClick() {
        this.setState(prevState => ({
            questionset: [...prevState.questionset, {questionset: ""}],
            question: [...prevState.question, {question: ""}],
            answer: [...prevState.answer, {answer: ""}]
        }))
    }

    createQuestionSet() {
        return this.state.questionset.map((el, i) => (
            <div key={i}>
                <input placeholder="Add a question set" name="questionset" value={el.questionset || ''} onChange={this.handleChange.bind(this, i)} />
                <input type='button' value='-' onClick={this.removeClick.bind(this, i)} />
            </div>
        ))

    }

    createQuestion() {
        return this.state.question.map((el, i) => (
            <div key={i}>

                <input placeholder="Add a question" name="question" value={el.question || ''} onChange={this.handleChange.bind(this, i)} />
                <input type='button' value='-' onClick={this.removeClick.bind(this, i)} />
            </div>
        ))
    }

    createAnswer() {
        return this.state.answer.map((el, i) => (
            <div key={i}>
                <input placeholder="Add an Answer" name="answer" value={el.answer || ''} onChange={this.handleChange.bind(this, i)} />
                <input type='button' value='-' onClick={this.removeClick.bind(this, i)} />
            </div>
        ))
    }

    handleChange(i, e) {
        const { name, value } = e.target;
        let question = [...this.state.question];
        question[i] = { ...question[i], [name]: value };
        let questionset = [...this.state.questionset];
        questionset[i] = { ...questionset[i], [name]: value };
        let answer = [...this.state.answer];
        answer[i] = { ...answer[i], [name]: value };
        this.setState({ questionset, question, answer });
    }

    removeClick(i) {
        let questionset = [...this.state.questionset];
        let question = [...this.state.question];
        let answer = [...this.state.answer];
        questionset.splice(i, 1);
        question.splice(i, 1);
        answer.splice(i,1);
        this.setState({ questionset, question, answer });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.createQuestionSet()}
                {this.createQuestion()}
                {this.createAnswer()}
                <input type='button' value='add more' onClick={this.addClick.bind(this)} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default TestComp;
import React from 'react';

class TestComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionset: [],
            question: ["test"],
            answer: []
        };
        this.createQuestion = this.createQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addClick() {
        this.setState(prevState => ({
            questionset: [...prevState.questionset, {questionset: ""}],
            question: [...prevState.question, {question: "test"}],
            answer: [...prevState.answer, {answer: ""}]
        }))
    }

    createQuestionSet() {
        return this.state.questionset.map((el, i) => (
            <div key={i}>
                <div><input placeholder="Add a question set" name="questionset" value={el.questionset || ''} onChange={this.handleChange.bind(this, i)} /></div>
                <div><input placeholder="Add a question" name="question" value={el.question || ''} onChange={this.handleChange.bind(this, i)} />
                <button type="button" onClick={this.createQuestion.bind(this)}> + </button><button type="button"> - </button>
                </div>
                <div><input placeholder="Add an Answer" name="answer" value={el.answer || ''} onChange={this.handleChange.bind(this, i)} /></div>
                
                <input type='button' value='-' onClick={this.removeClick.bind(this, i)} />
            </div>
        ))

    }

    createQuestion() {
        console.log(this.state);
        this.setState(prevState => ({ question: [...prevState.question, "modified"]}));
        console.log(this.state);
        return (
            <div>

                <input placeholder="Add a question" name="question" value={this.state.question}  />
                
            </div>
        )
    }

    createAnswer() {
        /* return this.state.answer.map((el, i) => (
            { <div key={i}>
                <input placeholder="Add an Answer" name="answer" value={el.answer || ''} onChange={this.handleChange.bind(this, i)} />
                <input type='button' value='-' onClick={this.removeClick.bind(this, i)} />
            </div> 
        )) */
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
                <div>
                <div>
                <div><input placeholder="Add a question set" name="questionset" value={this.state.questionset } /></div>
                <div><input placeholder="Add a question" name="question" value={this.state.question}/>
                <button type="button" onClick={this.createQuestion.bind(this)}> + </button><button type="button"> - </button>
                </div>
                <div><input placeholder="Add an Answer" name="answer" value={this.state.answer} /></div>
                
                <input type='button' value='-' onClick={this.removeClick.bind(this)} />
            </div>
                </div>
                
                <input type='button' value='add more' onClick={this.addClick.bind(this)} />
                <input type="submit" value="Submit" />
                
            </form>
        );
    }
}

export default TestComp;
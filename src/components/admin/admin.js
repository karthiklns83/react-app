import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Nav from '../nav/nav';
import SaveInfo from '../../api/authUser';
import QuestionSet from '../questionset/questionset'
import './admin.css'
import { render } from '@testing-library/react';
var fs = require('fs');

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [{ value: null }],
            answers: [{ answer: null }],
            set: [{ value: null }],
            questionnaire: [{ question: [], answer: [] }],
            setCount: 0
        };
        // Questionnaire.questionSet[0].question.push("11");
        // Questionnaire.questionSet[0].answer.push("11");
        // Questionnaire.questionSet[1].question.push("11");
        // Questionnaire.questionSet[1].answer.push("11");

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buildJSON = this.buildJSON.bind(this);
        this.getDisplayName = this.getDisplayName.bind(this);
        this.getTrainingParts = this.getTrainingParts.bind(this);
        this.getTrainingResponse = this.getTrainingResponse.bind(this);
    }

    /* createUI() {
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
    } */

    componentDidMount(){
        var data = SaveInfo.readQuestion();
        this.setState({object: JSON.stringify(data)});
        console.log("read data frm file" + (this.state.object));
    }

    handleChange(i, event) {
        let values = [...this.state.values];
        console.log("i value" + i + " Que event" + event.target.value);
        values[i].value = event.target.value;
        this.setState({ values });
    }

    handleAnswerChange(i, event) {
        let answers = [...this.state.answers];
        console.log("i value" + i + "Ans event" + event.target.value);
        answers[i].answer = event.target.value;
        this.setState({ answers });

    }

    addSetClick(i) {
        console.log("i val inside addset func " + i);
        // Questionnaire.questionSet[0].question.push("11");
        // Questionnaire.questionSet[0].answer.push("11");
        this.setState(prevState => (
            {
                setCount: i + 1,
                //Questionnaire: [prevState.Questionnaire,{ value: null}]
                //Questionnaire: [...prevState.Questionnaire.questionSet[i+1].answer,{ value: null}]
                values: [...prevState.values, { value: null }],
                answers: [...prevState.answers, { value: null }]
            }));
    }

    addClick() {
        this.setState(prevState => ({
            values: [...prevState.values, { value: null }]
        }));
    }

    addAnswerClick() {
        this.setState(prevState => ({
            answers: [...prevState.answers, { value: null }]
        }));
    }

    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

    removeSetClick(index) {
        let values = [...this.state.values];
        let answers = [...this.state.answers];
        values.splice(index, 1);
        answers.splice(index, 1);
        this.setState({ values, answers });
    }

    removeAnswerClick(i) {
        let answers = [...this.state.answers];
        answers.splice(i, 1);
        this.setState({ answers });

    }

    getDisplayName(current, total) {
        var displayname = "Q-";
        displayname = displayname + (current + 1) + "-" + total;
        console.log(displayname);
        return displayname;
    }

     getTrainingParts(index) {
             return (this.state.values[index].value).split(',')
     }
 
     getTrainingResponse(index) {
             return (this.state.answers[index].answer).split(',')
     }

    buildJSON() {
        let payLoad;
        var questionsLength = this.state.values.length;

        payLoad = {
            appList: [{
                appId: "hardcodednow",
                appName: "Noah",
                intentList: []
            }]
        }
        for (let arr = 0; arr < questionsLength; arr++) {
            payLoad.appList[0].intentList.push({
                id_intent: "",
                displayName: this.getDisplayName(arr, questionsLength),
                trainingParts: this.getTrainingParts(arr),
                trainingResponse: this.getTrainingResponse(arr)
            })
        }
        return payLoad;
    }

    handleSubmit = (event) => {
        let requestPayload = this.buildJSON();
        console.log("final payload" + JSON.stringify(requestPayload));
       /*  var savedInfo = SaveInfo.saveQuestionSet(requestPayload);
        if (savedInfo){
                console.log(savedInfo);
                alert("Save done"); */
       // }
        event.preventDefault();
    }

    render() {
        return (
            <div className="Topic">
                <Header />
                <div className="navbar">
                <Nav /></div>
                <div className="bodyAdmin">
            <form onSubmit={this.handleSubmit}>
                {this.state.values.map((el, i) => (
                    <div>
                        <div key={i}>
                            <input
                                type="text"
                                placeholder="question"
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
                                placeholder="answer"
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
                <label >Question-set-{this.state.setCount + 1}</label>
                {this.state.set.map((val, index) => (
                    <div>
                        <input type="button" className="btnAction" value="Add set" onClick={() => this.addSetClick(this.state.setCount)} />
                        <input type="button" className="btnAction" value="Remove set" onClick={() => this.removeSetClick(index)} /></div>
                ))}
                <input type="submit" value="Submit" />
            </form>
            </div>
            <Footer />
            </div>
        );
    }
}

export default Admin;
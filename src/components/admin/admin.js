import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import QuestionSet from '../questionset/questionset'
import './admin.css'
import { render } from '@testing-library/react';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [{ value: 0 }],
            answers: [{ answer: 0 }],
            set: [{ value: 0 }],
            setCount: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buildJSON = this.buildJSON.bind(this);
        this.getDisplayName = this.getDisplayName.bind(this);
        this.getTrainingParts = this.getTrainingParts.bind(this);
        this.getTrainingResponse = this.getTrainingResponse.bind(this);
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

    handleAnswerChange(i, event) {
        let answers = [...this.state.answers];
        answers[i].answer = event.target.value;
        this.setState({ answers });

    }

    addSetClick(i) {
        this.setState(prevState => ({
            setCount: i + 1,
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

    getDisplayName(total) {
        let arrVal;
        var displayname = "Q-";
        for (arrVal = 0; arrVal < total; arrVal++) {
            displayname = displayname + (arrVal + 1) + "-" + total;
            console.log(displayname);
            return displayname;

        }
    }

    getTrainingParts(trainingpartslength) {
        let arrVal;
        for (arrVal = 0; arrVal < trainingpartslength; arrVal++) {
            console.log([JSON.parse(this.state.values[arrVal].value)]);
            return [JSON.parse(this.state.values[arrVal].value)]
        }

    }

    getTrainingResponse(trainingpartslength) {
        let arrVal;
        for (arrVal = 0; arrVal < trainingpartslength; arrVal++) {
            console.log([JSON.parse(this.state.answers[arrVal].answer)]);
            return [JSON.parse(this.state.answers[arrVal].answer)]
        }

    }

    buildJSON() {
        let payLoad;
        var questionsLength = this.state.values.length;
        for (let arr = 0; arr < questionsLength; arr++) {
            payLoad = {
                appList: [{
                    appId: "hardcodednow",
                    appName: "Noah",
                    intentList: [{
                        id_intent: "",
                        displayName: this.getDisplayName(questionsLength),
                        trainingParts: this.getTrainingParts(questionsLength),
                        trainingResponse: this.getTrainingResponse(questionsLength),
                        setcount: this.state.setCount + 1
                    }]
                }]
            }
            //console.log("payload is" +JSON.stringify(payLoad));
        } return payLoad;
    }

    handleSubmit = (event) => {
        //this.state.setCount = this.state.setCount+1;

        let requestPayload = this.buildJSON();
        //alert(requestPayload);
        console.log("final payload" + JSON.stringify(requestPayload));
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
                        <input type="button" value="Add set" onClick={() => this.addSetClick(this.state.setCount)} />
                        <input type="button" value="Remove set" onClick={() => this.removeSetClick(index)} /></div>
                ))}

                <input type="submit" value="Submit" />

            </form>
        );
    }
}

export default Admin;
import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Nav from '../nav/nav';
import SaveInfo from '../../api/authUser';
import QuestionSet from '../questionset/questionset'
import './admin.css'
import { render } from '@testing-library/react';
import { read } from 'fs';
var fs = require('fs');

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainingParts: [{ value: null }],
            trainingResponse: [{ answer: null }],
            set: [{ value: null }],
            questionnaire: [{ question: [], answer: [] }],
            setCount: 0,
            appList: [],
            intentList: []
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
        return this.state.trainingParts.map((el, i) => (
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

    componentDidMount() {
        var data;
        SaveInfo.readQuestion().then(response => {
            response = JSON.stringify(response);
            response = JSON.parse(response);
            if (response.status == 200 ) {
                if(response.data == "") return false;
                 console.log(response);
                this.setState({ intentList: response.data.appList[0].intentList });
            }
            else {
                this.setState({
                    intentList:
                        [
                            {
                                "id_intent": "",
                                "displayName": "",
                                "trainingParts": [
                                ],
                                "trainingResponse": [
                                ]
                            }
                        ]
                })
            }
        });
    }

    handleChange(i, event) {
        let intentList = [...this.state.intentList];
        intentList[i].trainingParts = event.target.value;
        this.setState({ intentList })
    }

    handleAnswerChange(i, event) {
        let intentList = [...this.state.intentList];
        intentList[i].trainingResponse = event.target.value;
        this.setState({ intentList });

    }

    addSetClick(i) {
        console.log("i val inside addset func " + i);
        this.setState(prevState => (
            {
                setCount: i + 1,
                //Questionnaire: [prevState.Questionnaire,{ value: null}]
                //Questionnaire: [...prevState.Questionnaire.questionSet[i+1].answer,{ value: null}]
                intentList: [...prevState.intentList, { value: null }]
            }));
    }

    addClick() {
        this.setState(prevState => ({
            trainingParts: [...prevState.trainingParts, { value: null }]
        }));
    }

    addAnswerClick() {
        this.setState(prevState => ({
            trainingResponse: [...prevState.trainingResponse, { value: null }]
        }));
    }

    removeClick(i) {
        let trainingParts = [...this.state.trainingParts];
        trainingParts.splice(i, 1);
        this.setState({ trainingParts });
    }

    removeSetClick(index) {
        let intentList = [...this.state.intentList];
        intentList.splice(index, 1);
        //trainingResponse.splice(index, 1);
        this.setState({ intentList });
    }

    removeAnswerClick(i) {
        let trainingResponse = [...this.state.trainingResponse];
        trainingResponse.splice(i, 1);
        this.setState({ trainingResponse });

    }

    getDisplayName(current, total) {
        var displayname = "app1-Q-";
        displayname = displayname + (current + 1) + "-" + total;
        console.log(displayname);
        return displayname;
    }

    getTrainingParts(index) {
        var trainingpart = (this.state.intentList[index].trainingParts).replace(/\n/g, '')
        return trainingpart.split(',')
    }

    getTrainingResponse(index) {
        var trainingresponse = (this.state.intentList[index].trainingResponse).replace(/\n/g, '')
        return trainingresponse.split(',')
    }

    buildJSON() {
        let payLoad;
        var questionsLength = this.state.intentList.length;

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
        SaveInfo.saveQuestionSet(requestPayload).then(response => {
            console.log(response);
            if (response.status == 200) {
                alert("saved");
            }
            else {
                alert("failed")
            }
        })
        event.preventDefault();
    }

    render() {
        console.log("inside render" + (this.state.intentList.length));
        return (
            <div className="Topic">
                <Header />
                <div className="navbar">
                    <Nav /></div>
                <div className="bodyAdmin">
                    <form onSubmit={this.handleSubmit}>
                        {this.state.intentList.map((el, i) => (
                            <div>
                                <div key={i} className="container">
                                    <label className="quelabel">Questionset-{i + 1}</label>
                                    <div className="rowseparator"></div>
                                    <textarea cols="50" rows="4"
                                        type="text"
                                        spellCheck="false"
                                        className="textbox"
                                        placeholder="question"
                                        value={el.trainingParts || ""}
                                        onChange={e => this.handleChange(i, e)}
                                    />
                                    <br />
                                    <textarea cols="50" rows="4"
                                        type="text"
                                        spellCheck="false"
                                        className="textbox"
                                        placeholder="answer"
                                        value={el.trainingResponse || ""}
                                        onChange={e => this.handleAnswerChange(i, e)}
                                    />
                                </div></div>
                        ))}
                        {this.state.set.map((val, index) => (
                            <div>
                                <input type="button" className="btnAction" value="Add set" onClick={() => this.addSetClick(this.state.setCount)} />
                                <input type="button" className="btnAction" value="Remove set" onClick={() => this.removeSetClick(index)} /></div>
                        ))}
                        <input type="submit" value="Save Questionset" className="btnSubmit" />
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Admin;
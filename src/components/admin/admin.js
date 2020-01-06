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

    componentDidMount(){
        var data = {
            "appList": [
                {
                    "appId": "hardcodednow",
                    "appName": "Noah",
                    "intentList": [
                        {
                            "id_intent": "",
                            "displayName": "Q-1-2",
                            "trainingParts": [
                                "q1",
                                "q2",
                                "q3"
                            ],
                            "trainingResponse": [
                                "a1",
                            ]
                        },
                        {
                            "id_intent": "",
                            "displayName": "Q-2-2",
                            "trainingParts": [
                                "q4",
                                "q5"
                            ],
                            "trainingResponse": [
                                "a2",
                                "a3",
                                "a4",
                                "a5",
                                "a6",
                                "a7"
                            ]
                        }
                    ]
                }
            ]
        }
        var data = JSON.stringify(data);
        var data = JSON.parse(data);
        console.log(data);
        var intentLength = data.appList[0].intentList.length;
        var intent;
        for (intent = 0; intent < intentLength; intent++){
            this.setState(prevState => (
                {
                    trainingResponse : [...prevState.trainingResponse, {value: data.appList[0].intentList[0].trainingResponse }],
                    trainingParts: [...prevState.trainingParts, { value: data.appList[0].intentList[0].trainingParts }]
                    
                }));
        }
            
        
        //this.setState({});
    }

    handleChange(i, event) {
        let trainingParts = [...this.state.trainingParts];
        console.log("i value" + i + " Que event" + event.target.value);
        trainingParts[i].value = event.target.value;
        this.setState({ trainingParts });
    }

    handleAnswerChange(i, event) {
        let trainingResponse = [...this.state.trainingResponse];
        console.log("i value" + i + "Ans event" + event.target.value);
        trainingResponse[i].answer = event.target.value;
        this.setState({ trainingResponse });

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
                trainingParts: [...prevState.trainingParts, { value: null }],
                trainingResponse: [...prevState.trainingResponse, { value: null }]
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
        let trainingParts = [...this.state.trainingParts];
        let trainingResponse = [...this.state.trainingResponse];
        trainingParts.splice(index, 1);
        trainingResponse.splice(index, 1);
        this.setState({ trainingParts, trainingResponse });
    }

    removeAnswerClick(i) {
        let trainingResponse = [...this.state.trainingResponse];
        trainingResponse.splice(i, 1);
        this.setState({ trainingResponse });

    }

    getDisplayName(current, total) {
        var displayname = "Q-";
        displayname = displayname + (current + 1) + "-" + total;
        console.log(displayname);
        return displayname;
    }

     getTrainingParts(index) {
             return (this.state.trainingParts[index].value).split(',')
     }
 
     getTrainingResponse(index) {
             return (this.state.trainingResponse[index].answer).split(',')
     }

    buildJSON() {
        let payLoad;
        var questionsLength = this.state.trainingParts.length;

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
                {this.state.trainingParts.map((el, i) => (
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
                {this.state.trainingResponse.map((el, i) => (
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
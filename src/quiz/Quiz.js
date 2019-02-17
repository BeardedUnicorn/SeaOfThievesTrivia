import React, { Component } from 'react';
import './Quiz.css';

const groups = [
    "Ancient Spire Outpost",
    "Dagger Tooth Outpost",
    "Galleon's Grave Outpost",
    "Golden Sands Outpost",
    "Plunder Outpost",
    "Sanctuary Outpost"
];

const answers = [
    {
        description: "cat-placeholder",
        group_id: 0,
        source: "https://loremflickr.com/200/300/cat"
    },
    {
        description: "cat-placeholder",
        group_id: 0,
        source: "https://loremflickr.com/200/300/cat"
    },
    {
        description: "dog-placeholder",
        group_id: 1,
        source: "https://loremflickr.com/200/300/dog"
    },
    {
        description: "snake-placeholder",
        group_id: 2,
        source: "https://loremflickr.com/200/300/snake"
    },

];

class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            currentQuestion: this.createQuestion(),
            score: {
                correct: 0,
                total: 0
            }
        };
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    createQuestion = () => {
        const numberOfChoices = 3;
        let choices = [999, 999, 999];
        let i = 0;

        // Create a set of unique choices.
        while (i < numberOfChoices) {
            let possibleChoice = this.getRandomInt(groups.length);

            while (choices.includes(possibleChoice)) {
                possibleChoice = this.getRandomInt(groups.length);
            }

            if (!choices.includes(possibleChoice)) {
                choices[i] = possibleChoice;
            }
            i++;
        }

        // Set a basic question with potentially no correct answer.
        let question = {
            answer: answers[this.getRandomInt(answers.length)],
            choices: choices,
        };

        // Check if the answer is in the choices already, or if it should be added.
        if (!question.choices.includes(question.answer.group_id)) {
            question.choices[this.getRandomInt(question.choices.length)] = question.answer.group_id;
        }

        return question;
    };

    checkAnswer = (event, answerId) => {
        // Update the scores and generate a new question.
        const newState = this.state;
        if (this.state.currentQuestion.answer.group_id === answerId){
            newState.score.correct = newState.score.correct + 1;
        }
        newState.score.total = newState.score.total + 1;
        newState.currentQuestion = this.createQuestion();
        this.setState(newState);
    };

    render() {
        return (
            <div className="Quiz">
                <div className="score">{this.state.score.correct} / {this.state.score.total}</div>
                <div className="question">
                    <img src={this.state.currentQuestion.answer.source} alt="placeholder"/>
                </div>
                <div className="answers">
                    <button type="button" onClick={(event) => this.checkAnswer(event, this.state.currentQuestion.choices[0])}>{groups[this.state.currentQuestion.choices[0]]}</button>
                    <button type="button" onClick={(event) => this.checkAnswer(event, this.state.currentQuestion.choices[1])}>{groups[this.state.currentQuestion.choices[1]]}</button>
                    <button type="button" onClick={(event) => this.checkAnswer(event, this.state.currentQuestion.choices[2])}>{groups[this.state.currentQuestion.choices[2]]}</button>
                </div>
            </div>
        );
    }
}

export default Quiz;

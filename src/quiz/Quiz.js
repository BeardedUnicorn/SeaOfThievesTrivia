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
        description: "ancient-spire-01",
        group_id: 0,
        source: '../clips/ancient-spire/2019-02-16_16-59-57-edited-full.mp4'
    },
    {
        description: "ancient-spire-02",
        group_id: 0,
        source: '../clips/ancient-spire/2019-02-16_17-04-57-edited-full.mp4'
    },
    {
        description: "ancient-spire-03",
        group_id: 0,
        source: '../clips/ancient-spire/2019-02-16_17-13-57-edited-full.mp4'
    },
    {
        description: "ancient-spire-04",
        group_id: 0,
        source: '../clips/ancient-spire/2019-02-16_17-19-57-edited-full.mp4'
    },
    {
        description: "dagger-tooth-01",
        group_id: 1,
        source: '../clips/dagger-tooth/2019-02-16_17-36-22-edited-full.mp4'
    },
    {
        description: "dagger-tooth-02",
        group_id: 1,
        source: '../clips/dagger-tooth/2019-02-16_17-42-22-edited-full.mp4'
    },
    {
        description: "dagger-tooth-03",
        group_id: 1,
        source: '../clips/dagger-tooth/2019-02-16_17-48-22-edited-full.mp4'
    },
    {
        description: "dagger-tooth-04",
        group_id: 1,
        source: '../clips/dagger-tooth/2019-02-16_17-55-22-edited-full.mp4'
    },
    {
        description: "galleons-grave-01",
        group_id: 2,
        source: '../clips/galleons-grave/2019-02-16_15-19-58-edited-full.mp4'
    },
    {
        description: "galleons-grave-02",
        group_id: 2,
        source: '../clips/galleons-grave/2019-02-16_15-24-58-edited-full.mp4'
    },
    {
        description: "galleons-grave-03",
        group_id: 2,
        source: '../clips/galleons-grave/2019-02-16_15-30-58-edited-full.mp4'
    },
    {
        description: "galleons-grave-04",
        group_id: 2,
        source: '../clips/galleons-grave/2019-02-16_15-38-58-edited-full.mp4'
    },
    {
        description: "golden-sands-01",
        group_id: 3,
        source: '../clips/golden-sands/2019-02-17_12-02-44-edited-full.mp4'
    },
    {
        description: "golden-sands-02",
        group_id: 3,
        source: '../clips/golden-sands/2019-02-17_12-07-45-edited-full.mp4'
    },
    {
        description: "golden-sands-03",
        group_id: 3,
        source: '../clips/golden-sands/2019-02-17_12-14-45-edited-full.mp4'
    },
    {
        description: "golden-sands-04",
        group_id: 3,
        source: '../clips/golden-sands/2019-02-17_12-22-45-edited-full.mp4'
    },
    {
        description: "plunder-01",
        group_id: 4,
        source: '../clips/plunder/2019-02-16_14-07-58-edited-full.mp4'
    },
    {
        description: "plunder-02",
        group_id: 4,
        source: '../clips/plunder/2019-02-16_14-12-58-edited-full.mp4'
    },
    {
        description: "plunder-03",
        group_id: 4,
        source: '../clips/plunder/2019-02-16_14-18-58-edited-full.mp4'
    },
    {
        description: "plunder-04",
        group_id: 4,
        source: '../clips/plunder/2019-02-16_14-25-58-edited-full.mp4'
    },
    {
        description: "sanctuary-01",
        group_id: 5,
        source: '../clips/sanctuary/2019-02-16_18-53-55-edited-full.mp4'
    },
    {
        description: "sanctuary-02",
        group_id: 5,
        source: '../clips/sanctuary/2019-02-16_18-58-55-edited-full.mp4'
    },
    {
        description: "sanctuary-03",
        group_id: 5,
        source: '../clips/sanctuary/2019-02-16_19-04-56-edited-full.mp4'
    },
    {
        description: "sanctuary-04",
        group_id: 5,
        source: '../clips/sanctuary/2019-02-16_19-10-56-edited-full.mp4'
    }
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
        console.log(this.state);
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
        console.log(question);
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
        console.log(this.state);
    };

    render() {
        return (
            <div className="Quiz">
                <div className="score">{this.state.score.correct} / {this.state.score.total}</div>
                <div className="question">
                    <video src={this.state.currentQuestion.answer.source} type="video/mp4" autoPlay loop>
                        Your browser does not support the video tag.
                    </video>
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

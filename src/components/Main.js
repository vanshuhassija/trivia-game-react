import React from "react";
import Answers from "./Answers";
import PopUp from "./PopUp";
import Footer from "./Footer";
import axios from "axios";
import { sortBy, indexOf } from "lodash";
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nr: 0,
      question: "",
      showButton: false,
      questionAnswered: false,
      score: 0,
      displayPopup: "flex",
      data: [],
      total: 0
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleShowButton = this.handleShowButton.bind(this);
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
  }

  pushData(nr) {
    console.log("In push data state is ", this.state);
    this.setState(
      {
        question: this.state.data[nr].question,
        answers: [
          this.state.data[nr].answers[0],
          this.state.data[nr].answers[1],
          this.state.data[nr].answers[2],
          this.state.data[nr].answers[3]
        ],
        correct: this.state.data[nr].correct,
        nr: this.state.nr + 1
      },
      () => {
        this.setState(
          {
            correct: indexOf(this.state.answers, this.state.correct) + 1
          },
          () => {
            console.log("Final callback set state as ", this.state);
          }
        );
      }
    );
  }

  componentWillMount() {
    console.log("In component Did Mount");
    axios
      .post(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple",

        {
          header: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",

            "Access-Control-Allow-Headers": "application/json"
          }
        }
      )
      .then(response => {
        console.log("Response is ", response);
        let data = [];
        response.data.results.map(question => {
          data.push({
            question: question.question,
            answers: sortBy([
              ...question.incorrect_answers,
              question.correct_answer
            ]),
            correct: question.correct_answer
          });
        });
        this.setState(
          {
            data: data,
            total: data.length,
            nr: 0
          },
          () => {
            console.log("going to call pushData");
            this.pushData(this.state.nr);
          }
        );
      });
  }
  nextQuestion() {
    let { nr, total, score } = this.state;
    if (nr === total) {
      this.setState({
        displayPopup: "flex"
      });
    } else {
      this.pushData(nr);
      this.setState({
        showButton: false,
        questionAnswered: false
      });
    }
  }

  handleShowButton() {
    this.setState({
      showButton: true,
      questionAnswered: true
    });
  }

  handleStartQuiz() {
    this.setState({
      displayPopup: "none",
      nr: 1
    });
  }

  handleIncreaseScore() {
    this.setState({
      score: this.state.score + 1
    });
  }

  render() {
    let { nr } = this.state;

    console.log("State iin main is ", this.state);

    let {
      total,
      question,
      answers,
      correct,
      showButton,
      questionAnswered,
      displayPopup,
      score
    } = this.state;

    return (
      <div className="container">
        <PopUp
          style={{ display: displayPopup }}
          score={score}
          total={total}
          startQuiz={this.handleStartQuiz}
        />

        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <div id="question">
              <h4>
                Question {nr}/{total}
              </h4>
              <p>{question}</p>
            </div>
            <Answers
              answers={answers}
              correct={correct}
              showButton={this.handleShowButton}
              isAnswered={questionAnswered}
              increaseScore={this.handleIncreaseScore}
            />
            <div id="submit">
              {showButton ? (
                <button className="fancy-btn" onClick={this.nextQuestion}>
                  {nr === total ? "Finish quiz" : "Next question"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

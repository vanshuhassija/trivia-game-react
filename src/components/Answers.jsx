import React from "react";

export default class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnswered: false,
      classNames: ["", "", "", ""]
    };

    this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer(e) {
    let { isAnswered } = this.props;

    if (!isAnswered) {
      let elem = e.currentTarget;
      let { correct, increaseScore } = this.props;
      let answer = Number(elem.dataset.id);
      let updatedClassNames = this.state.classNames;

      if (answer === correct) {
        updatedClassNames[answer - 1] = "right";
        increaseScore();
      } else {
        updatedClassNames[answer - 1] = "wrong";
      }

      this.setState(
        {
          classNames: updatedClassNames
        },
        () => {
          setTimeout(() => {
            this.setState({
              classNames: ["", "", "", ""]
            });
          }, 1000);
        }
      );

      this.props.showButton();
    }
  }

  render() {
    let { answers } = this.props;
    let { classNames } = this.state;
    console.log("in render of answers ", answers);
    let transition = {
      transitionName: "example",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300
    };

    return (
      <div id="answers">
        {this.props.answers ? (
          <ul>
            <li
              onClick={this.checkAnswer}
              className={classNames[0]}
              data-id="1"
            >
              <span>A</span> <p>{answers[0]}</p>
            </li>
            <li
              onClick={this.checkAnswer}
              className={classNames[1]}
              data-id="2"
            >
              <span>B</span> <p>{answers[1]}</p>
            </li>
            <li
              onClick={this.checkAnswer}
              className={classNames[2]}
              data-id="3"
            >
              <span>C</span> <p>{answers[2]}</p>
            </li>
            <li
              onClick={this.checkAnswer}
              className={classNames[3]}
              data-id="4"
            >
              <span>D</span> <p>{answers[3]}</p>
            </li>
          </ul>
        ) : null}
        {/* 
          {this.props.answers &&
            this.props.answers.map(answer => {
              return (
                <li
                  onClick={this.checkAnswer}
                  className={classNames[0]}
                  data-id="1"
                >
                  <span>A</span> <p>{answers}</p>
                </li>
              );
            })} */}
      </div>
    );
  }
}

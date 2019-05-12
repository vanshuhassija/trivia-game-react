import React from "react";

class PopUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: "start",
      title: "Welcome to Quiz",
      text: "This is a trivia game built using ReactJS. ",
      buttonText: "Start the quiz"
    };

    this.popupHandle = this.popupHandle.bind(this);
  }

  popupHandle() {
    let { time } = this.state;

    if (time === "start") {
      this.setState({
        time: "end",
        title: "Congratulations!",
        buttonText: "Done"
      });

      this.props.startQuiz();
    } else {
      //location.reload(); // restart the application
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text:
        "You have completed the quiz. <br /> You got: <strong>" +
        this.props.score +
        "</strong> out of <strong>" +
        this.props.total +
        "</strong> questions right."
    });
  }

  createMarkup(text) {
    return { __html: text };
  }

  render() {
    let { title, text, buttonText } = this.state;

    let { style } = this.props;
    console.log("Props are ", this.props);
    return (
      <div className="popup-container" style={style}>
        <div className="container">
          <div className="col-md-8 col-md-offset-2">
            <div className="popup">
              <h1>{title}</h1>
              <p dangerouslySetInnerHTML={this.createMarkup(text)} />
              <button className="fancy-btn" onClick={this.popupHandle}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopUp;

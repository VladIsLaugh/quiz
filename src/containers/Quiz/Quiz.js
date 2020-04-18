import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "./../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "./../../components/FinishedQuiz/FinishedQuiz";
import axios from "./../../axios/axios-quiz";
import Loader from "./../../components/UI/Loader/Loader";

class Quiz extends Component {
  state = {
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    answersResults: [],
    quiz: [],
    loading: true,
  };
  onclickHandler = (id) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") return;
    }
    let question = this.state.quiz[this.state.activeQuestion];
    let answersResults = this.state.answersResults;

    if (question.rightAnswerId === id) {
      answersResults.push("success");
      this.setState({
        answerState: { [id]: "success" },
      });
    } else {
      answersResults.push("error");
      this.setState({
        answerState: { [id]: "error" },
      });
    }
    const timeout = window.setTimeout(() => {
      if (this.isNext()) {
        console.log("next");
        this.setState({
          activeQuestion: this.state.activeQuestion + 1,
          answerState: null,
          answersResults: answersResults,
        });
      } else {
        console.log("finish");
        this.setState({
          isFinished: true,
          answerState: null,
        });
      }

      window.clearTimeout(timeout);
    }, 1000);
  };


  async componentDidMount() {
    try {
     const res = await axios.get(`/quiozes/${this.props.match.params.id}.json`);
      const quiz = res.data;
     console.log(quiz);
      this.setState({
       loading: false,
        quiz,
      });
    } catch (e) {
      console.log(e);
    }
  }

  isNext = () => {
    return !(this.state.activeQuestion + 1 === this.state.quiz.length);
  };

  retry = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      answersResults: [],
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>
          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              answersResults={this.state.answersResults}
              questions={this.state.quiz}
              retry={this.retry}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              rightAnswerId={
                this.state.quiz[this.state.activeQuestion].rightAnswerId
              }
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onclickHandler={this.onclickHandler}
              activeQuestion={this.state.activeQuestion + 1}
              quizLength={this.state.quiz.length}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;

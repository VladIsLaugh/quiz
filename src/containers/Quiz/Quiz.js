import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "./../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "./../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    answersResults:[],
    quiz: [
      {
        id: 1,
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        answers: [
          { text: "Жовтий", id: 1 },
          { text: "Синій", id: 2 },
          { text: "Зелений", id: 3 },
          { text: "Вопрос4", id: 4 },
        ],
      },
      {
        id: 2,
        question: "В каком городе основали русь",
        rightAnswerId: 3,
        answers: [
          { text: "1700", id: 1 },
          { text: "1702", id: 2 },
          { text: "1703", id: 3 },
          { text: "1705", id: 4 },
        ],
      },
      {
        id: 3,
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        answers: [
          { text: "Жовтий", id: 1 },
          { text: "Синій", id: 2 },
          { text: "Зелений", id: 3 },
          { text: "Вопрос4", id: 4 },
        ],
      }
    ],
  };
  onclickHandler = (id) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") return;
    }
    let question = this.state.quiz[this.state.activeQuestion];
    let answersResults = this.state.answersResults

    if (question.rightAnswerId === id) {
      answersResults.push('success')
      this.setState({
        answerState: { [id]: "success" },
      });
    } else {
      answersResults.push("error")
      this.setState({
        answerState: { [id]: "error" },
      });
    }
    const timeout = window.setTimeout(() => {
      if (this.isNext()) {
        console.log("next")
        this.setState({
          activeQuestion: this.state.activeQuestion + 1,
          answerState: null,
          answersResults: answersResults
        });

        
      } else {
        console.log("finish")
        this.setState({
          isFinished: true,
          answerState: null,
        });
      }

      window.clearTimeout(timeout);
    }, 1000);
  };

  isNext = () => {
    return !(this.state.activeQuestion + 1 === this.state.quiz.length);
  };

  retry =() =>{
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      answersResults:[]
    })

  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
        <h1>Quiz</h1>
          {this.state.isFinished
          ?
          <FinishedQuiz 
          answersResults={this.state.answersResults}
          questions={this.state.quiz}
          retry={this.retry}
          />
        :         
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
        }

        </div>
      </div>
    );
  }
}

export default Quiz;

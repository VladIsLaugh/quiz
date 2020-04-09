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
        question: "Who is the president of ukraine",
        rightAnswerId: 2,
        answers: [
          { text: "Petro Poroshenko", id: 1 },
          { text: "Volodymer Zelenskiy", id: 2 },
          { text: "Genadiy Gorin", id: 3 },
          { text: "Obama", id: 4 },
        ],
      },
      {
        id: 2,
        question: "Коли народився Влад Віт",
        rightAnswerId: 3,
        answers: [
          { text: "12 травня 1700р", id: 1 },
          { text: "18 січня 1892р", id: 2 },
          { text: "5 жовтня 1999", id: 3 },
          { text: "вчора", id: 4 },
        ],
      },
      {
        id: 3,
        question: "Як буде пісюн на англіській",
        rightAnswerId: 2,
        answers: [
          { text: "Pisun", id: 1 },
          { text: "Penis", id: 2 },
          { text: "Eldak", id: 3 },
        ],
      },
      {
        id: 4,
        question: "Останій вопрос",
        rightAnswerId: 1,
        answers: [
          { text: "правильний отвєт", id: 1 },
          { text: "неправильний отвєь", id: 2 },
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

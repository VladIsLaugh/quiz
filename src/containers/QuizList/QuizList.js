import React, { Component } from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";

class QuizList extends Component {
  render() {
    return (
      <div className={classes.QuizList}>
        <h1>QuizList</h1>
        <ul>
          {[1, 2, 3].map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={'/quiz/'+index}>{"task" + item}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default QuizList;

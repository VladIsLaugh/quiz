import React from "react";
import classes from "./FinishedQuiz.module.css";

const FinishedQuiz = (props) => {
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        <li>
          <strong>1.</strong> Шото там <i className={"fa fa-check " + classes.success} />
        </li>
        <li>
          <strong>2.</strong> Шото там <i className={"fa fa-times " + classes.error} />
        </li>
        <li>
          <strong>3.</strong> Шото там <i className={"fa fa-times " + classes.error} />
        </li>
        <li>
          <strong>4.</strong> Шото там <i className={"fa fa-check " + classes.success} />
        </li>
      </ul>

      <p>правильних ответов 4 из 12</p>

      <div>
        <button>На главную</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;

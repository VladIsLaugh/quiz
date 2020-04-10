import React from "react";
import classes from "./App.module.css";
import Layout from "./hoc/Layout";
import Quiz from "./containers/Quiz/Quiz";
import { Switch, Route } from "react-router-dom";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";

const App = () => {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" component={QuizList} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;

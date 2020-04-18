import React, { Component } from "react";
import classes from "./QuizList.module.css";
import Loader from "./../../components/UI/Loader/Loader";
import { NavLink } from "react-router-dom";
import axios from "./../../axios/axios-quiz";

class QuizList extends Component {
  state = {
    quiozes: [],
    loading: true,
  };
  async componentDidMount() {
    const quiozes = [];
    try {
      const res = await axios.get("/quiozes.json");
      
      Object.keys(res.data).forEach((key, index) => {
        quiozes.push({ id: key, name: `test ${index + 1}` });
      });
      console.log(quiozes);
      this.setState({
        quiozes,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <h1>QuizList</h1>

        {this.state.loading ? (
          <Loader />
        ) : (
          <ul>
            {this.state.quiozes.map((item) => {
              return (
                <li key={item.id}>
                  <NavLink to={"/quiz/" + item.id}>{item.name}</NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default QuizList;

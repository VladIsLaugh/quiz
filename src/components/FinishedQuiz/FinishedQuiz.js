import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from './../UI/Button/Button'

const FinishedQuiz = (props) => {

  const countRightAnswers = () => {
    return props.answersResults.reduce((total, item)=>{
        if(item==='success')
        total++
          return total;
    },0)

  }

  const cls = []

  props.answersResults.map((item,index)=>{
    return  item==='success'? cls.push(["fa fa-check "+ classes[item]]) :cls.push(["fa fa-times "+ classes[item]])
  })

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
{
  props.questions.map((item, index) =>{
    return(<li key={index}>
      <strong>{index + 1}.</strong> {item.question} <i  className={cls[index].join(' ')} />
    </li>)
  })
}

{/* {props.answersResults.map((item,index)=>{
  return  (<li>
  <strong>{index + 1}.</strong>  <i className={item=='success'?"fa fa-check "+ classes[item]: "fa fa-times "+ classes[item] } />
</li>)
})} */}


      </ul>



  <p>правильних ответов {countRightAnswers()} из {props.questions.length}</p>

      <div>
      <Button onClick={props.retry} type="primary">Повторить</Button>
      <Button  type="success">Перейти к списку тестов</Button>
        
      </div>
    </div>
  );
};

export default FinishedQuiz;

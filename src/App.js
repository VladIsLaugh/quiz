import React from 'react';
import classes from './App.module.css'
import Layout from './hoc/Layout';
import Quiz from './containers/Quiz/Quiz';


const App = () => {
  return (
    <div className={classes.App}>
      <Layout >
        <Quiz/>
        </Layout>
    </div>
  );
}

export default App;

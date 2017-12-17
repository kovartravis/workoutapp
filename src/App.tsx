import * as React from 'react';
import './App.css';
import SingleWorkout from './components/single-workout/single-workout'


const logo = require('./logo.png');

interface State{
  mes: string;
}

interface Props {

}

class App extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <SingleWorkout />
      </div>
    );
  }
}

export default App;
import * as React from 'react';
import './App.css';
import FullProgram from './components/full-program/full-program'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'typeface-roboto'

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
      <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <FullProgram />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
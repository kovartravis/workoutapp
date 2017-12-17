import * as React from 'react';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import ExerciseSelector from '../exercise-selector/exercise-selector';

interface State{
    exerciseList: Array<JSX.Element>
}

interface Props {

}

class ExerciseList extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
    this.state = {
        exerciseList: [<ListItem key="0"><ExerciseSelector /></ListItem>]
    }

    this.addToExerciseList = this.addToExerciseList.bind(this)
  }

  addToExerciseList(){
    this.setState({exerciseList: this.state.exerciseList.concat(<ListItem key={this.state.exerciseList.length}><ExerciseSelector /></ListItem>)})
    console.log(this.state.exerciseList)
  }

  render() {
    return (
      <List>
        {this.state.exerciseList}
        <FlatButton label="New Exercise" primary={true} onClick={this.addToExerciseList}/>
      </List>
    );
  }
}

export default ExerciseList;
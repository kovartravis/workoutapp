import * as React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import ExerciseSelector from '../exercise-selector/exercise-selector';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';

interface ExerciseList{
  key: number
}

interface State{
    exerciseList: Array<JSX.Element>
    children: Object
}

interface childState{
  lift: number;
  sets: number;
  reps: number;
  weight: number;
  notes: string;
}

interface Props {
  id: string
  onStateChange: any
}

class ExerciseList extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
    this.key = -1;
    this.addToExerciseList = this.addToExerciseList.bind(this)
    this.getKey = this.getKey.bind(this)
    this.onChildStateChange = this.onChildStateChange.bind(this)

    let mykey = this.getKey()
    this.state = {
        exerciseList: [<div key={mykey}><IconButton onClick={(event) => this.removeFromExerciseList(event, mykey)}>
                                               <ContentClear />
                                             </IconButton><ExerciseSelector id={mykey} onStateChange={this.onChildStateChange}/></div>],
        children: {}
                
    }
  }

  addToExerciseList(){
    let mykey = this.getKey()
    this.setState({exerciseList: this.state.exerciseList.concat(<div key={mykey}><IconButton onClick={(event) => this.removeFromExerciseList(event, mykey)}>
                                                <ContentClear /></IconButton><ExerciseSelector id={mykey} onStateChange={this.onChildStateChange}/></div>)})
    
  }

  onChildStateChange(childstate: childState, id: string){
    this.state.children[id] = childstate
    this.setState({children: this.state.children}, () =>
    this.props.onStateChange(this.state.children, this.props.id))
  }

  removeFromExerciseList(event: React.FormEvent<any>, key: string){
    const newExerciseList = this.state.exerciseList;
    let k = parseInt(key)
    
    const j = newExerciseList.find( a => {if(a.key === k.toString())return true; else return false; })
    let i = 0
    if(j !== undefined){
      i = newExerciseList.indexOf(j);
    }

    newExerciseList.splice(i, 1)
    this.setState({exerciseList: newExerciseList});
  }

  getKey(){
    this.key = this.key + 1;
    return this.key.toString();
  }

  render() {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} />
        <TableBody displayRowCheckbox={false}>
          <TableRowColumn>
            {this.state.exerciseList}
            <FlatButton label="New Exercise" primary={true} onClick={this.addToExerciseList}/>
          </TableRowColumn>
        </TableBody>
      </Table>
    );
  }
}

export default ExerciseList;
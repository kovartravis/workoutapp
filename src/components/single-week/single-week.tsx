import * as React from 'react';
import './single-week.style.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import ExerciseList from '../exercise-list/exercise-list'

interface SingleWeek{
  headerStrings: Array<string>
  key: number
}

interface State{
  headers: Array<JSX.Element>
  workoutList: Array<JSX.Element>
  children: Object
}

interface selectorState{
  lift: number;
  sets: number;
  reps: number;
  weight: number;
  notes: string;
}

interface childState{
  children: Object
}

interface Props {
  id: string
  onStateChange: any
  injectedState?: Array<Array<selectorState>>
}

class SingleWeek extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
    
    this.headerStrings = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    this.key = -1

    this.addToWorkoutList = this.addToWorkoutList.bind(this);
    this.removeFromWorkoutList = this.removeFromWorkoutList.bind(this);
    this.getKey = this.getKey.bind(this);
    this.onChildStateChange = this.onChildStateChange.bind(this)

    let headers: Array<JSX.Element> = []
    let workoutList: Array<JSX.Element> = []
    let mykey = ""

    if(this.props.injectedState){
      for(let i = 0; i < Object.keys(this.props.injectedState).length; i++){
        console.log(this.props.injectedState[i])
        mykey = this.getKey();
        headers.push(<TableHeaderColumn key={headers.length.toString()} columnNumber={headers.length}>
        {this.headerStrings[headers.length]} 
        <IconButton onClick={(event) => this.removeFromWorkoutList(event, mykey)}>
          <ContentClear />
        </IconButton></TableHeaderColumn>);
        workoutList.push(<TableRowColumn key={mykey} className="tablecolumn">
        <ExerciseList id={mykey} onStateChange={this.onChildStateChange} injectedState={this.props.injectedState[i]}/></TableRowColumn>)
      }
    }else{
      mykey = this.getKey();
      headers.push(<TableHeaderColumn key={headers.length.toString()} columnNumber={headers.length}>
                                                          {this.headerStrings[headers.length]} 
                                                          <IconButton onClick={(event) => this.removeFromWorkoutList(event, mykey)}>
                                                            <ContentClear />
                                                          </IconButton></TableHeaderColumn>),
      workoutList.push(<TableRowColumn key={mykey} className="tablecolumn">
                                      <ExerciseList id={mykey} onStateChange={this.onChildStateChange} /></TableRowColumn>)
    }

    this.state = {
      headers: headers, 
      workoutList: workoutList,
      children: {}
    }
  }

  addToWorkoutList(){
    const mykey = this.getKey();
    this.setState({headers: this.state.headers.concat(<TableHeaderColumn key={this.state.headers.length.toString()} columnNumber={this.state.headers.length}>
                                                                {this.headerStrings[this.state.headers.length]} 
                                                                <IconButton onClick={(event) => this.removeFromWorkoutList(event, mykey)}>
                                                                  <ContentClear />
                                                                </IconButton></TableHeaderColumn>),
                           workoutList: this.state.workoutList.concat(<TableRowColumn key={mykey} className="tablecolumn">
                                                 <ExerciseList id={mykey} onStateChange={this.onChildStateChange}/></TableRowColumn>) });
  }

  onChildStateChange(childstate: childState, id: string){
    this.state.children[id] = childstate
    this.setState({children: this.state.children}, ()=>
    this.props.onStateChange(this.state.children, this.props.id))
  }

  removeFromWorkoutList(event: React.FormEvent<any>, key: string){
    const newHeaders = this.state.headers;
    const newWorkoutList = this.state.workoutList;
    let k = parseInt(key)
    
    const j = newWorkoutList.find( a => { if(a.key === k.toString()) return true; else return false; })
    let i = 0
    if(j !== undefined){
      i = newWorkoutList.indexOf(j);
    }
    newHeaders.splice(this.state.headers.length - 1, 1)
    newWorkoutList.splice(i, 1)

    this.setState({headers: newHeaders,
                  workoutList: newWorkoutList
    });

  }

  getKey(){
    this.key = this.key + 1;
    return this.key.toString();
  }

  render() {
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {this.state.headers}
            <TableHeaderColumn>
              <FlatButton  label="Add a Day" onClick={this.addToWorkoutList} />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.state.workoutList}
          <TableRowColumn>
            <h3>Im just here to take up space for now</h3>
          </TableRowColumn>
        </TableBody>
      </Table>
    );
  }
}

export default SingleWeek;
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
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward'
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward'
import './exercise-list.style.css'

interface ExerciseList{
  key: number
}

interface State{
    exerciseList: Array<JSX.Element>
    children: Object
}

interface childState{
  lift: string;
  sets: number;
  reps: number;
  weight: number;
  notes: string;
}

interface Props {
  id: string
  onStateChange: any
  injectedState?: Array<childState>
}

class ExerciseList extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
    this.key = -1;
    this.addToExerciseList = this.addToExerciseList.bind(this)
    this.getKey = this.getKey.bind(this)
    this.onChildStateChange = this.onChildStateChange.bind(this)
    this.moveContentUpward = this.moveContentUpward.bind(this)
    this.moveContentDownward = this.moveContentDownward.bind(this)

    let exerciseList: Array<JSX.Element> = []
    let mykey = ""
    if(this.props.injectedState){
      for(let i = 0; i < Object.keys(this.props.injectedState).length; i++){
        mykey = this.getKey()
        exerciseList.push((<div key={mykey} className="exerciseSelectorHolder">
                              <div className="buttons"> 
                                <IconButton onClick={(event) => this.removeFromExerciseList(event, mykey)}><ContentClear /></IconButton>
                                <IconButton onClick={(event) => this.moveContentUpward(mykey)}><ArrowUpward /></IconButton>
                                <IconButton onClick={(event) => this.moveContentDownward(mykey)}><ArrowDownward /></IconButton>
                              </div>
                              <ExerciseSelector id={mykey} onStateChange={this.onChildStateChange} injectedState={this.props.injectedState[i]}/>
                            </div>))
      }
    }else{
      mykey = this.getKey()
      exerciseList = [<div key={mykey} className="exerciseSelectorHolder">
                        <div className="buttons"> 
                          <IconButton onClick={(event) => this.removeFromExerciseList(event, mykey)}><ContentClear /></IconButton>
                          <IconButton onClick={(event) => this.moveContentUpward(mykey)}><ArrowUpward /></IconButton>
                          <IconButton onClick={(event) => this.moveContentDownward(mykey)}><ArrowDownward /></IconButton>
                        </div>
                        <ExerciseSelector id={mykey} onStateChange={this.onChildStateChange}/>
                      </div>]
    }

    this.state = {
        exerciseList: exerciseList,
        children: {}
                
    }
  }

  addToExerciseList(){
    let mykey = this.getKey()
    this.setState({exerciseList: this.state.exerciseList.concat(
                                                <div key={mykey} className="exerciseSelectorHolder">
                                                  <div className="buttons">
                                                    <IconButton onClick={(event) => this.removeFromExerciseList(event, mykey)}><ContentClear /></IconButton>
                                                    <IconButton onClick={(event) => this.moveContentUpward(mykey)}><ArrowUpward /></IconButton>
                                                    <IconButton onClick={(event) => this.moveContentDownward(mykey)}><ArrowDownward /></IconButton>
                                                  </div>
                                                  <ExerciseSelector id={mykey} onStateChange={this.onChildStateChange}/>
                                                </div>)})
    
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

  moveContentUpward(key: string){
    const newExerciseList = this.state.exerciseList;
    let k = parseInt(key)
    
    const elementGoingUp = newExerciseList.find( a => {if(a.key === k.toString())return true; else return false; })
    let indexGoingUp = 0
    if(elementGoingUp !== undefined){
      indexGoingUp = newExerciseList.indexOf(elementGoingUp);
    }

    if(indexGoingUp !== 0){
      let temp = this.state.exerciseList[indexGoingUp - 1]
      this.state.exerciseList[indexGoingUp - 1] = this.state.exerciseList[indexGoingUp]
      this.state.exerciseList[indexGoingUp] = temp
      this.setState({exerciseList: this.state.exerciseList})
    }
  }

  moveContentDownward(key: string){
    const newExerciseList = this.state.exerciseList;
    let k = parseInt(key)
    
    const elementGoingUp = newExerciseList.find( a => {if(a.key === k.toString())return true; else return false; })
    let indexGoingUp = 0
    if(elementGoingUp !== undefined){
      indexGoingUp = newExerciseList.indexOf(elementGoingUp);
    }

    if(indexGoingUp !== this.addToExerciseList.length - 1){
      let temp = this.state.exerciseList[indexGoingUp + 1]
      this.state.exerciseList[indexGoingUp + 1] = this.state.exerciseList[indexGoingUp]
      this.state.exerciseList[indexGoingUp] = temp
      this.setState({exerciseList: this.state.exerciseList})
    }
  }

  getKey(){
    this.key = this.key + 1;
    return this.key.toString();
  }

  onHover(row: number, col: number){
    console.log(row + ' ' + col)
  }

  render() {
    return (
      <Table selectable={false} onCellHover={this.onHover}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} />
        <TableBody displayRowCheckbox={false}>
          <TableRowColumn className="columnAccordian">
            {this.state.exerciseList}
            <div className="exercisebutton">
              <FlatButton label="New Exercise" primary={true} backgroundColor="#e1fccf"onClick={this.addToExerciseList}/>
            </div>
          </TableRowColumn>
        </TableBody>
      </Table>
    );
  }
}

export default ExerciseList;
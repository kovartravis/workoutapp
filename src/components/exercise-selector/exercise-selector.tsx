import * as React from 'react';
import './exercise-selector.style.css';
// import SelectField from 'material-ui/SelectField'
// import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card'

interface State {
    lift: string;
    sets: number;
    reps: number;
    weight: number;
    notes: string;
}

interface Props {
    id: string
    onStateChange: any
    injectedState?: State
}

class ExerciseSelector extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    if(this.props.injectedState){
        this.state = this.props.injectedState;
    }else{
        this.state = {
            lift: 'Enter Lift',
            sets: 0,
            reps: 0,
            weight: 0,
            notes: ''
        };
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.passInfoUp = this.passInfoUp.bind(this)

    this.props.onStateChange(this.state, this.props.id);
  }

  passInfoUp(){
      return this
  }

  handleInputChange(event: React.FormEvent<any>){
      switch(event.currentTarget.id){
          case 'lift': this.setState({lift: event.currentTarget.value}, ()=> 
                       this.props.onStateChange(this.state, this.props.id));
                       break;
          case 'sets': this.setState({sets: event.currentTarget.value}, ()=> 
                       this.props.onStateChange(this.state, this.props.id));
                       break;
          case 'reps': this.setState({reps: event.currentTarget.value}, () =>
                       this.props.onStateChange(this.state, this.props.id));
                       break;
          case 'weight': this.setState({weight: event.currentTarget.value}, ()=>
                         this.props.onStateChange(this.state, this.props.id));
                         break;
          case 'notes': this.setState({notes: event.currentTarget.value}, ()=>
                        this.props.onStateChange(this.state, this.props.id));
                        break;
          default: console.log('dont be here');
      }
  }

  createSubtitleString(){
      return this.state.sets + 'x' + this.state.reps + '@' + this.state.weight + 'lbs'
  }

  render() {
    return (
      <Card>
        <CardHeader title={this.state.lift} subtitle={this.createSubtitleString()} actAsExpander={true} showExpandableButton={true}/>
        <CardText expandable={true}>
            <TextField id="lift" style={{width: 300}} floatingLabelText="Exercise" type="string" onChange={this.handleInputChange} /><br/>
            <TextField id="sets" style={{width: 100}} value={this.state.sets} floatingLabelText="Sets" type="number" onChange={this.handleInputChange} />
            <TextField id="reps" style={{width: 100}} value={this.state.reps} floatingLabelText="Reps" type="number" onChange={this.handleInputChange} />
            <TextField id="weight" style={{width: 100}} value={this.state.weight} floatingLabelText="Weight" type="number" onChange={this.handleInputChange} /><br/>
            <TextField id="notes" className="notesInput" value={this.state.notes} floatingLabelText="Notes" type="text"  onChange={this.handleInputChange} />
        </CardText>
      </Card>
    );
  }
}

export default ExerciseSelector;